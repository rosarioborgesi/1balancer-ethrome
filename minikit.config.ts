const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: process.env.NEXT_PUBLIC_MINIAPP_HEADER,
    payload: process.env.NEXT_PUBLIC_MINIAPP_PAYLOAD,
    signature: process.env.NEXT_PUBLIC_MINIAPP_SIGNATURE,
  },
  miniapp: {
    version: "1",
    name: "1rebalancer",
    subtitle: "Portfolio Rebalancing",
    description: "Automatic portfolio rebalancing",
    screenshotUrls: [`${ROOT_URL}/hero.png`],
    iconUrl: `${ROOT_URL}/logo.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#1D293C",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["defi", "1inch", "base", "portfolio"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;

