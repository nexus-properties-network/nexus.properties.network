import Link from "next/link";
import { PublicPage } from "@/components/public-page";

const fields = ["Property title", "City", "Area", "Property type", "Purpose", "Expected price"];

export default function ListPropertyPage() {
  return <PublicPage eyebrow="Seller workflow" title={<>Turn your property into a <em>trusted opportunity.</em></>} description="Submit structured property information, images, and ownership evidence. Publishing remains subject to verification and governance review."><section className="public-section"><div className="section-intro"><p className="kicker">Submission steps</p><h2>One guided path from draft to review.</h2><p>Authentication, role verification, property details, media, documents, verification, and final review.</p></div><form className="discovery-grid" action="/register">{fields.map((field) => <label key={field}>{field}<input name={field.toLowerCase().replaceAll(" ", "-")} required placeholder={`Enter ${field.toLowerCase()}`} /></label>)}<label className="discovery-wide">Description<textarea name="description" rows={5} placeholder="Describe the property and relevant context" /></label><div className="discovery-wide"><p className="auth-note">Images and ownership documents are collected after account creation.</p><button className="button button-primary" type="submit">Continue to registration <span>-&gt;</span></button> <Link className="button button-outline" href="/verification">Review verification rules</Link></div></form></section></PublicPage>;
}
