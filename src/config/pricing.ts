export type NexusRole = "buyer" | "seller" | "agent" | "agency" | "investor" | "developer" | "industrial" | "corporate" | "government";

export interface NexusPlan {
  name: string;
  monthly: number | "Custom";
  yearly: number | "Custom";
  audience: NexusRole[];
  features: string[];
}

export const nexusPlans: NexusPlan[] = [
  { name: "Free Agent", monthly: 0, yearly: 0, audience: ["agent"], features: ["Basic network entry", "Agent profile", "Core workspace"] },
  { name: "Verified Agent", monthly: 500, yearly: 5000, audience: ["agent"], features: ["Verified profile", "Identity verification", "Lead access", "Lead Lock"] },
  { name: "Professional Agent", monthly: 1000, yearly: 10000, audience: ["agent"], features: ["Multiple area management", "Lead Lock", "Deal Lock", "Client management", "AI Agent Assistant"] },
  { name: "Premium Agent", monthly: 2500, yearly: 25000, audience: ["agent"], features: ["Priority visibility", "Advanced analytics", "Investment opportunities", "Marketing tools", "Premium support"] },
  { name: "Starter Agency", monthly: 5000, yearly: 50000, audience: ["agency"], features: ["Team management", "Lead distribution", "Agency reporting"] },
  { name: "Professional Agency", monthly: 10000, yearly: 100000, audience: ["agency"], features: ["CRM workflows", "Advanced lead and deal operations", "Revenue analytics"] },
  { name: "Enterprise Agency", monthly: 25000, yearly: 250000, audience: ["agency"], features: ["Enterprise operations", "Branches", "Advanced workforce and support"] },
  { name: "Basic Developer", monthly: 15000, yearly: 150000, audience: ["developer"], features: ["Projects", "Units", "Leads", "Verification"] },
  { name: "Professional Developer", monthly: 30000, yearly: 300000, audience: ["developer"], features: ["Investor matching", "Marketing", "Sales analytics", "AI tools"] },
  { name: "Enterprise Developer", monthly: 75000, yearly: 750000, audience: ["developer"], features: ["Enterprise project operations", "Advanced integrations", "Custom automation"] },
  { name: "Basic Investor", monthly: 5000, yearly: 50000, audience: ["investor"], features: ["Opportunities", "Market intelligence", "Basic ROI analysis"] },
  { name: "Pro Investor", monthly: 15000, yearly: 150000, audience: ["investor"], features: ["Portfolio", "Risk information", "Investment AI"] },
  { name: "Elite Investor", monthly: 50000, yearly: 500000, audience: ["investor"], features: ["Advanced intelligence", "Capital planning", "Premium opportunities"] },
  { name: "Starter Corporate", monthly: 25000, yearly: 250000, audience: ["corporate"], features: ["Asset portfolio", "Corporate workflows", "Verification"] },
  { name: "Professional Corporate", monthly: 50000, yearly: 500000, audience: ["corporate"], features: ["Multi-location operations", "Team management", "Asset intelligence"] },
  { name: "Enterprise Corporate", monthly: 150000, yearly: 1500000, audience: ["corporate"], features: ["Enterprise portfolio", "Custom workflows", "Integrations"] },
  { name: "Basic Industrial", monthly: 10000, yearly: 100000, audience: ["industrial"], features: ["Industrial assets", "Factories", "Warehouses"] },
  { name: "Professional Industrial", monthly: 25000, yearly: 250000, audience: ["industrial"], features: ["Verification", "Industrial AI", "Compliance workflows"] },
  { name: "Enterprise Industrial", monthly: 75000, yearly: 750000, audience: ["industrial"], features: ["Enterprise industrial operations", "Advanced analytics", "Custom integration"] },
  { name: "Government Custom", monthly: "Custom", yearly: "Custom", audience: ["government"], features: ["Read-only intelligence", "Regulatory monitoring", "National reporting"] },
];

export const pricingPolicy = {
  currency: "PKR",
  yearlyDiscount: "Pay yearly and receive approximately two months free.",
  leadLockFee: 500,
  dealLockFees: { small: 500, medium: 1500, large: 3000, enterprise: 5000 },
  verificationFees: { basic: 500, advanced: 1000, corporate: 5000, project: 10000 },
  listings: { basic: 500, verified: 1000, premium: 2500, featured: "5000+" },
  automation: { starterChatbot: 25000, chatbotWebsite: 55000, enterpriseAutomation: 150000 },
} as const;
