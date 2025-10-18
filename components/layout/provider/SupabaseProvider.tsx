"use client";

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { decodeJwtUnsafe } from "../../../lib/jwt";
import { useUserInfo } from "@/hooks/use-user-info";
import { clearSupabaseTokenCache, getSupabaseAccessToken } from "@/services/store/token-cache";
import { clearSupabaseAuthCookie } from "@/utils/actions/supabase/auth";
import { createClient as createBrowserSupabase } from "@/utils/supabase/client";

type Ctx = {
  client: ReturnType<typeof createBrowserSupabase> | null;
  claims: Record<string, unknown> | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const SupabaseCtx = createContext<Ctx>({ client: null, claims: null, loading: true, refresh: async () => {} });

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { isUserAuthenticated } = useUserInfo();
  const [client] = useState(() => createBrowserSupabase());
  const [claims, setClaims] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const warmedRef = useRef(false);
  const prevAuthRef = useRef<boolean | null>(null);
  const clearedOnceRef = useRef(false);

  const refresh = useMemo(
    () =>
      async function refresh() {
        setLoading(true);
        try {
          const token = await getSupabaseAccessToken();
          setClaims(decodeJwtUnsafe(token));
        } finally {
          setLoading(false);
        }
      },
    [],
  );

  useEffect(() => {
    // Initial unauthenticated mount: clear any stale cache once
    if (prevAuthRef.current === null && !isUserAuthenticated) {
      clearSupabaseTokenCache();
      setClaims(null);
      // We're unauthenticated; no need to keep loading
      setLoading(false);
    }

    // Warm once per login
    if (isUserAuthenticated && !warmedRef.current) {
      warmedRef.current = true;
      clearedOnceRef.current = false; // reset for next logout
      void refresh();
    }

    // Fire cookie clear only on transition from authenticated -> unauthenticated
    const prev = prevAuthRef.current;
    if (prev === true && isUserAuthenticated === false && !clearedOnceRef.current) {
      warmedRef.current = false;
      clearedOnceRef.current = true;
      clearSupabaseTokenCache();
      setClaims(null);
      void clearSupabaseAuthCookie();
      // Stop loading after logout
      setLoading(false);
    }
    prevAuthRef.current = isUserAuthenticated;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserAuthenticated]);

  const value = useMemo<Ctx>(() => ({ client, claims, loading, refresh }), [client, claims, loading, refresh]);
  return <SupabaseCtx.Provider value={value}>{children}</SupabaseCtx.Provider>;
}

export function useSupabaseSession() {
  return useContext(SupabaseCtx);
}
