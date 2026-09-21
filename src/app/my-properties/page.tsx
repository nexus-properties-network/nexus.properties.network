import Link from "next/link";
import { PublicPage } from "@/components/public-page";

const states = [["Draft", "Prepare details before submission."], ["Pending verification", "Documents and ownership evidence are under review."], ["Verified", "Approved records ready for eligible visibility."], ["Closed or rented", "Completed lifecycle records remain auditable."]] as const;

export default function MyPropertiesPage() {
  return <PublicPage eyebrow="Seller workspace" title={<>Your properties, one <em>operating view.</em></>} description="Manage listings, verification status, leads, analytics, and lifecycle actions from a dedicated seller workspace."><section className="public-section"><div className="public-plans">{states.map(([title, text]) => <article className="public-plan" key={title}><span className="info-index">LIFECYCLE</span><h3>{title}</h3><p>{text}</p><Link className="button button-outline" href="/login">Open workspace <span>-&gt;</span></Link></article>)}</div><div className="empty-listings" style={{ marginTop: 30 }}><p>Sign in to load your property records.</p><Link className="button button-primary" href="/login">Sign in to continue <span>-&gt;</span></Link></div></section></PublicPage>;
}
