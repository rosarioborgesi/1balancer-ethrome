"use server";

/**
 * Server action: fetch tokens snapshot from 1inch portfolio API.
 * Uses the Next.js API route at /api/1inch to attach the API key.
 *
 * Example (server):
 *   await getTokensSnapshot("1", "0x...");
 */
export async function getTokensSnapshot(
  chainId: string,
  addresses?: string,
): Promise<any | null> {

  const directParams = new URLSearchParams({ chain_id: chainId });
  if (addresses) {
    directParams.append("addresses", addresses);
  }
  const directUrl = `https://api.1inch.com/portfolio/portfolio/v5.0/tokens/snapshot?${directParams.toString()}`;
  const apiKey = process.env.ONEINCH_API_KEY;

  try {
    const res = await fetch(directUrl, {
      cache: "no-store",
      headers: apiKey
        ? {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          }
        : undefined,
    });
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[getTokensSnapshot] direct => ${res.ok ? "ok" : `failed (${res.status})`}`);
    }
    if (!res.ok) return null;
    const json = await res.json();
    return json;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[getTokensSnapshot] direct error for chainId=${chainId}: ${err}`);
    }
    return null;
  } finally {
    console.timeEnd?.(`[getTokensSnapshot] chainId=${chainId}`);
  }
}