export type NexusRole = "buyer" | "seller" | "agent" | "agency" | "investor" | "developer" | "industrial" | "corporate" | "government";

export interface NexusPlan {
  name: string;
  monthly: number | "Custom";
  yearly: number | "Custom";
  audience: NexusRole[];
  features: string[];
}

export const nexusPlans: NexusPlan[] = [
  { name: "Buyer Free", monthly: 0, yearly: 0, audience: ["buyer"], features: ["Property search", "Saved properties", "Buyer AI guidance"] },
  { name: "Buyer Premium", monthly: 1500, yearly: 15000, audience: ["buyer"], features: ["Advanced search", "Area intelligence", "Protected deal tracking"] },
  { name: "Verified Agent", monthly: 500, yearly: 5000, audience: ["agent"], features: ["Verified profile", "Lead protection", "Agent workspace"] },
  { name: "Professional Agent", monthly: 1000, yearly: 10000, audience: ["agent"], features: ["Lead lock", "Deal lock", "Performance analytics"] },
  { name: "Starter Agency", monthly: 5000, yearly: 50000, audience: ["agency"], features: ["Team management", "Lead distribution", "Agency reporting"] },
  { name: "Developer Professional", monthly: 30000, yearly: 300000, audience: ["developer"], features: ["Project operations", "Investor matching", "Sales analytics"] },
  { name: "Investor Pro", monthly: 15000, yearly: 150000, audience: ["investor"], features: ["ROI intelligence", "Land banking", "Funding opportunities"] },
  { name: "Industrial Professional", monthly: 25000, yearly: 250000, audience: ["industrial"], features: ["Industrial assets", "Verification workflows", "Industrial AI"] },
  { name: "Corporate Professional", monthly: 50000, yearly: 500000, audience: ["corporate"], features: ["Portfolio management", "Asset intelligence", "Corporate workflows"] },
  { name: "Government Custom", monthly: "Custom", yearly: "Custom", audience: ["government"], features: ["Read-only intelligence", "Regulatory monitoring", "National reporting"] },
];

export const pricingPolicy = {
  currency: "PKR",
  yearlyDiscount: "Pay yearly and receive approximately two months free.",
  leadLockFee: 500,
  dealLockFees: { small: 500, medium: 1500, large: 3000, enterprise: 5000 },
  verificationFees: { basic: 500, advanced: 1000, corporate: 5000, project: 10000 },
} as const;
