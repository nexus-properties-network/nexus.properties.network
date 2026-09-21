import Link from "next/link";
import { PublicPage } from "@/components/public-page";

const steps = [["01", "Buyer AI", "Captures budget, purpose, location, and priorities."], ["02", "Area Intelligence AI", "Connects the request to cities, areas, and local context."], ["03", "Property Intelligence AI", "Ranks approved matches and clearly labels missing data."]] as const;

export default function AISearchPage() {
  return <PublicPage eyebrow="Conversational discovery" title={<>Tell Nexus what you <em>need.</em></>} description="Start with a natural request such as 'I need a 10 Marla house in Wapda Town'. The AI workforce routes the request through the right specialists and never invents unavailable listings."><section className="public-section"><div className="assistant"><div><p className="kicker">Buyer AI workspace</p><h3>Describe your next property.</h3><p>Live AI responses connect after authentication and approved data access are configured.</p></div><div className="assistant-tags"><span>Budget</span><span>City matching</span><span>Area intelligence</span><span>Verified only</span></div><Link className="button button-primary" href="/register">Start authenticated search <span>-&gt;</span></Link></div><div className="process-grid" style={{ marginTop: 55 }}>{steps.map(([number, title, text]) => <article className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section></PublicPage>;
+}
