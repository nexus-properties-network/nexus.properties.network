export type AIEmployeeStatus = "ACTIVE" | "SUSPENDED" | "MAINTENANCE" | "DEVELOPMENT";

export interface NexusAIEmployee {
  id: number;
  name: string;
  department: string;
  mission: string;
  responsibilities: string[];
  permissions: {
    canView: string[];
    canCreate: string[];
    canEdit: string[];
    canDelete: string[];
    canApprove: string[];
    canReject: string[];
    canEscalate: string[];
  };
  reportsTo: "AI_ADMIN" | "SUPER_ADMIN";
  escalationChain: string[];
  memoryAccess: string[];
  restrictions: string[];
  confidenceThreshold: number;
  status: AIEmployeeStatus;
}

const domainRules: Record<string, Pick<NexusAIEmployee, "permissions" | "memoryAccess" | "restrictions">> = {
  Governance: {
    permissions: { canView: ["RELEVANT_DOMAIN_RECORDS", "AUDIT_HISTORY"], canCreate: ["ALERTS", "RECOMMENDATIONS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["AUDIT_HISTORY", "RISK_SIGNALS"],
    restrictions: ["No direct suspension", "No financial movement", "No audit deletion"],
  },
  Property: {
    permissions: { canView: ["APPROVED_LISTINGS"], canCreate: ["RECOMMENDATIONS"], canEdit: ["DRAFT_LISTINGS"], canDelete: [], canApprove: [], canReject: [], canEscalate: ["VERIFICATION_AI", "AI_ADMIN"] },
    memoryAccess: ["PROPERTY_RECORDS", "PUBLIC_MARKET_DATA"],
    restrictions: ["No invented property, price, availability, or ownership", "No listing approval"],
  },
  Lead: {
    permissions: { canView: ["ASSIGNED_LEADS"], canCreate: ["ROUTING_RECOMMENDATIONS", "LEAD_ALERTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["LEAD_RECORDS", "LEAD_AUDIT_HISTORY"],
    restrictions: ["No unauthorized ownership transfer", "No lead deletion", "No hidden assignment"],
  },
  Deal: {
    permissions: { canView: ["PARTICIPATING_DEALS"], canCreate: ["DEAL_RECOMMENDATIONS", "DEAL_ALERTS"], canEdit: ["MILESTONE_RECOMMENDATIONS"], canDelete: [], canApprove: [], canReject: [], canEscalate: ["VERIFICATION_AI", "AI_ADMIN"] },
    memoryAccess: ["DEAL_RECORDS", "DEAL_AUDIT_HISTORY"],
    restrictions: ["No payment movement", "No ownership change", "No guaranteed outcome"],
  },
  Verification: {
    permissions: { canView: ["SUBMITTED_EVIDENCE"], canCreate: ["VERIFICATION_REPORTS", "RISK_ALERTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["VERIFICATION_RECORDS", "DOCUMENT_METADATA"],
    restrictions: ["Recommendation only until AI Admin or human review", "No document mutation", "No ownership transfer"],
  },
  Agency: {
    permissions: { canView: ["AGENCY_RECORDS", "ASSIGNED_AGENT_RECORDS"], canCreate: ["PERFORMANCE_REPORTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["AGENCY_MEMORY", "AGENT_PERFORMANCE"],
    restrictions: ["No cross-agency private data", "No lead theft", "No financial record mutation"],
  },
  Investment: {
    permissions: { canView: ["APPROVED_OPPORTUNITIES", "HISTORICAL_METRICS"], canCreate: ["INVESTMENT_REPORTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["INVESTOR_MEMORY", "INVESTMENT_RECORDS"],
    restrictions: ["No guaranteed ROI", "No invented forecasts", "No investment approval"],
  },
  Corporate: {
    permissions: { canView: ["AUTHORIZED_PORTFOLIOS"], canCreate: ["PORTFOLIO_REPORTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["CORPORATE_MEMORY", "PORTFOLIO_RECORDS"],
    restrictions: ["No legal approval", "No contract mutation", "No cross-client disclosure"],
  },
  Industrial: {
    permissions: { canView: ["APPROVED_INDUSTRIAL_RECORDS"], canCreate: ["INDUSTRIAL_REPORTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["VERIFICATION_AI", "AI_ADMIN"] },
    memoryAccess: ["INDUSTRIAL_RECORDS", "PROPERTY_RECORDS"],
    restrictions: ["No permit approval", "No ownership transfer", "No invented zoning facts"],
  },
  Agriculture: {
    permissions: { canView: ["APPROVED_AGRICULTURAL_RECORDS"], canCreate: ["AGRICULTURAL_REPORTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["VERIFICATION_AI", "AI_ADMIN"] },
    memoryAccess: ["AGRICULTURAL_RECORDS", "PROPERTY_RECORDS"],
    restrictions: ["No water-right approval", "No ownership transfer", "No invented land or water data"],
  },
  Revenue: {
    permissions: { canView: ["BILLING_RECORDS", "REVENUE_SUMMARIES"], canCreate: ["BILLING_REPORTS", "REVENUE_ALERTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["REVENUE_RECORDS", "PAYMENT_AUDIT_HISTORY"],
    restrictions: ["No fund movement", "No refund approval", "No financial record mutation"],
  },
  Platform: {
    permissions: { canView: ["PLATFORM_HEALTH", "AUDIT_HISTORY"], canCreate: ["SYSTEM_ALERTS"], canEdit: [], canDelete: [], canApprove: [], canReject: [], canEscalate: ["AI_ADMIN"] },
    memoryAccess: ["PLATFORM_MEMORY", "AUDIT_HISTORY"],
    restrictions: ["No silent action", "No credential access", "No audit deletion"],
  },
};

const workforceBlueprint: Array<[number, string, string, string]> = [
  [1, "AI Admin", "Governance", "Supervise Nexus OS workforce and protect platform integrity."],
  [2, "Governance AI", "Governance", "Enforce platform governance rules and controlled workflows."],
  [3, "Compliance AI", "Governance", "Monitor policy and regulatory compliance signals."],
  [4, "Audit AI", "Governance", "Monitor immutable audit trails and decision evidence."],
  [5, "Fraud Intelligence AI", "Governance", "Detect suspicious listings, accounts, leads, deals, and payments."],
  [6, "Risk Assessment AI", "Governance", "Score operational risk and route high-risk cases."],
  [7, "Dispute Resolution AI", "Governance", "Prepare evidence-based dispute cases for human review."],
  [8, "Buyer AI", "Property", "Help buyers search and compare approved properties."],
  [9, "Seller AI", "Property", "Help sellers create drafts and collect required evidence."],
  [10, "Property Intelligence AI", "Property", "Analyze approved property and market information."],
  [11, "Property Twin AI", "Property", "Maintain structured digital property representations."],
  [12, "Rental AI", "Property", "Support rental operations and approved rental insights."],
  [13, "Commercial Property AI", "Property", "Analyze approved commercial property records."],
  [14, "Luxury Property AI", "Property", "Support premium property discovery and analysis."],
  [15, "Lead Qualification AI", "Lead", "Qualify leads from declared intent and approved signals."],
  [16, "Lead Routing AI", "Lead", "Route qualified leads to eligible verified professionals."],
  [17, "Lead Lock AI", "Lead", "Protect lead ownership and lock history."],
  [18, "Lead Monitoring AI", "Lead", "Monitor the complete lead lifecycle."],
  [19, "Lead Recovery AI", "Lead", "Recommend recovery of expired or abandoned opportunities."],
  [20, "Lead Analytics AI", "Lead", "Measure lead ecosystem performance from recorded events."],
  [21, "Deal AI", "Deal", "Track transaction participants, milestones, and status."],
  [22, "Negotiation AI", "Deal", "Summarize offers and negotiation history without forcing outcomes."],
  [23, "Commission AI", "Deal", "Calculate recorded commission and fee allocations."],
  [24, "Documentation AI", "Deal", "Organize transaction documentation and missing evidence."],
  [25, "Escrow AI", "Deal", "Monitor protected transaction funds without moving money."],
  [26, "Deal Monitoring AI", "Deal", "Monitor deadlines, risks, documents, and payment milestones."],
  [27, "Verification AI", "Verification", "Coordinate verification requests and evidence reports."],
  [28, "Identity Verification AI", "Verification", "Validate identity evidence and report findings."],
  [29, "Property Verification AI", "Verification", "Validate property authenticity and consistency."],
  [30, "Ownership Verification AI", "Verification", "Validate ownership relationships and authority."],
  [31, "Document Verification AI", "Verification", "Validate document integrity, completeness, and duplicates."],
  [32, "Payment Verification AI", "Verification", "Validate payment evidence and flag anomalies."],
  [33, "Agent AI", "Agency", "Assist verified agents with assigned leads and deals."],
  [34, "Agency AI", "Agency", "Monitor agency operations, teams, and recorded performance."],
  [35, "Team Management AI", "Agency", "Balance team workloads and track productivity."],
  [36, "Performance AI", "Agency", "Measure operational performance from auditable metrics."],
  [37, "Branch Management AI", "Agency", "Monitor branch activity, leads, deals, and revenue."],
  [38, "Investment AI", "Investment", "Help investors discover approved opportunities."],
  [39, "ROI AI", "Investment", "Calculate historical investment metrics without guarantees."],
  [40, "Joint Venture AI", "Investment", "Match approved investors and partnership opportunities."],
  [41, "Land Banking AI", "Investment", "Track land opportunities, holding periods, and exits."],
  [42, "Funding AI", "Investment", "Track funding requests, stages, and milestones."],
  [43, "Corporate AI", "Corporate", "Support authorized corporate property operations."],
  [44, "Portfolio AI", "Corporate", "Track approved portfolio assets and performance."],
  [45, "Enterprise AI", "Corporate", "Support enterprise clients and integrations."],
  [46, "Industrial AI", "Industrial", "Analyze industrial property operations and records."],
  [47, "Warehouse AI", "Industrial", "Support warehouse listings, occupancy, and analytics."],
  [48, "Manufacturing AI", "Industrial", "Classify and analyze manufacturing facilities."],
  [49, "Agriculture AI", "Agriculture", "Support agricultural property and investment records."],
  [50, "Farm Intelligence AI", "Agriculture", "Analyze approved farm and land-use records."],
  [51, "Water Intelligence AI", "Agriculture", "Analyze water and irrigation records; escalate unknowns."],
  [52, "Revenue AI", "Revenue", "Track platform revenue from recorded transactions."],
  [53, "Subscription AI", "Revenue", "Evaluate configured plan eligibility and lifecycle."],
  [54, "Billing AI", "Revenue", "Organize invoices and billing history without fund movement."],
];

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

export const aiEmployeeRegistry: NexusAIEmployee[] = workforceBlueprint.map(([id, name, department, mission]) => ({
  id,
  name,
  department,
  mission,
  responsibilities: ["Answer within approved scope", "Create explainable recommendations", "Record an audit event", "Escalate uncertainty"],
  permissions: domainRules[department].permissions,
  reportsTo: name === "AI Admin" ? "SUPER_ADMIN" : "AI_ADMIN",
  escalationChain: name === "AI Admin" ? ["SUPER_ADMIN"] : ["AI_ADMIN", "SUPER_ADMIN"],
  memoryAccess: domainRules[department].memoryAccess,
  restrictions: domainRules[department].restrictions,
  confidenceThreshold: name === "AI Admin" ? 95 : 80,
  status: name === "Water Intelligence AI" ? "DEVELOPMENT" : "ACTIVE",
}));
