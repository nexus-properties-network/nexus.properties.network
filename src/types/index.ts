export type UserRole =
	| "buyer"
	| "seller"
	| "agent"
	| "investor"
	| "developer"
	| "verifier";

export type PropertyStatus =
	| "draft"
	| "listed"
	| "under-review"
	| "under-offer"
	| "closed";

export interface NavigationItem {
	label: string;
	href: string;
}