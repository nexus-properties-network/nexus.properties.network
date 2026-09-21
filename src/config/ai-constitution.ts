import { aiAssistants } from "./nexus-data";

export type AIEmployeeStatus = "ACTIVE" | "SUSPENDED" | "MAINTENANCE" | "DEVELOPMENT";

export interface NexusAIEmployee {
  id: number;
  name: string;
  department: string;
  mission: string;
  responsibilities: string[];
  reportsTo: "AI_ADMIN" | "SUPER_ADMIN";
  escalationChain: string[];
  memoryAccess: string[];
  restrictions: string[];
  confidenceThreshold: number;
  status: AIEmployeeStatus;
}

export const NO_HALLUCINATION_LAW = {
  enabled: true,
  rules: [
    "Never invent listings, users, prices, availability, ownership, payments, approvals, or statistics.",
    "Use only approved platform data, verified documents, immutable events, and approved knowledge.",
    "When data is unavailable, say Unknown, Pending, or Not Available.",
  ],
} as const;

export const DATA_ISOLATION_LAW = {
  buyerDataVisibleToSeller: false,
  sellerDataVisibleToBuyer: false,
  agentDataVisibleToOtherAgents: false,
  agencyDataVisibleToOtherAgencies: false,
  investorDataVisibleToPublic: false,
} as const;

export const MEMORY_CONSTITUTION = {
  scopes: ["USER", "PROPERTY", "LEAD", "DEAL", "AGENCY", "INVESTOR", "CORPORATE", "AI", "AUDIT"],
  allMemoryLogged: true,
  allMemoryAuditable: true,
  immutableHistory: true,
  deletionRequiresHumanGovernance: true,
} as const;

export const AI_ADMIN_GOVERNANCE = {
  systemId: "AI_ADMIN",
  reportsTo: "SUPER_ADMIN",
  monitors: ["AI_EMPLOYEES", "LISTINGS", "LEADS", "DEALS", "PAYMENTS", "DOCUMENTS", "USERS", "AUDIT_LOGS"],
  canRequestReports: true,
  canPauseAutomations: true,
  canRequireHumanReview: true,
  canEscalate: true,
  criticalEscalations: ["FRAUD", "PAYMENT_ANOMALY", "IDENTITY_ABUSE", "DATA_BREACH", "SECURITY_BREACH", "SYSTEM_FAILURE"],
} as const;

export const HUMAN_OVERRIDE_FRAMEWORK = {
  enabled: true,
  hierarchy: ["USER", "AGENT", "AGENCY_MANAGER", "ADMIN", "AI_ADMIN", "SUPER_ADMIN"],
  criticalActionsRequireAudit: true,
} as const;

export const AI_COMMUNICATION_PROTOCOL = {
  version: "1.0",
  levels: ["INFORMATIONAL", "ASSISTANCE", "OPERATIONAL", "VERIFICATION", "CRITICAL", "ESCALATION"],
  noSilentActions: true,
  allCriticalActionsLogged: true,
  directDatabaseMutationByAI: false,
  uncertaintyThreshold: 80,
} as const;

export const aiEmployeeRegistry: NexusAIEmployee[] = aiAssistants.map((assistant) => ({
  ...assistant,
  mission: `Support ${assistant.department.toLowerCase()} workflows with explainable, auditable recommendations.`,
  responsibilities: ["Answer within approved scope", "Create recommendations", "Record an audit event", "Escalate uncertainty"],
  reportsTo: assistant.name === "AI Admin" ? "SUPER_ADMIN" : "AI_ADMIN",
  escalationChain: assistant.name === "AI Admin" ? ["SUPER_ADMIN"] : ["AI_ADMIN", "SUPER_ADMIN"],
  memoryAccess: ["USER_CONTEXT", "RELEVANT_DOMAIN_RECORDS", "AUDIT_HISTORY"],
  restrictions: ["No invented facts", "No silent approvals", "No direct financial movement", "No deletion of audit history"],
  confidenceThreshold: assistant.name === "AI Admin" ? 95 : 80,
  status: assistant.name === "Water Intelligence AI" ? "DEVELOPMENT" : "ACTIVE",
}));
