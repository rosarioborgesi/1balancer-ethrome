"use client";

import { useAddFrame, useMiniKit } from "@coinbase/onchainkit/minikit";
import { ReactNode, useCallback, useEffect, useRef } from "react";

const Template = ({ children }: { children: ReactNode }) => {
  const addFrame = useAddFrame();
  const didInit = useRef(false);
  const { context } = useMiniKit();

  const checkFrameAndAdd = useCallback(async () => {
    try {
      await addFrame();
    } catch (error) {
      console.warn("addFrame was rejected by the user", error);
    }
  }, [addFrame]);

  useEffect(() => {
    if (!!context && !context.client.added && !didInit.current) {
      checkFrameAndAdd();
      didInit.current = true;
    }
  }, [checkFrameAndAdd, context]);
  return { children };
};

export default Template;
