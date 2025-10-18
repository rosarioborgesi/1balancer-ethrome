import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getName } from "@coinbase/onchainkit/identity";
import { Address } from "viem";
import { base } from "viem/chains";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(
  address: string | undefined,
  startChars = 6,
  endChars = 4
): string {
  if (!address) return "";
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export async function getBasenameName(address: Address) {
  const baseName = await getName({ address, chain: base });
  return baseName;
}
