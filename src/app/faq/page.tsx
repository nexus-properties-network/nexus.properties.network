"use client";

import { useMemo, useState } from "react";
import { PublicPage } from "@/components/public-page";
import { faqCategories, nexusFAQ } from "@/config/faq-knowledge-base";

export default function FAQPage() {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("All");
	const visible = useMemo(() => nexusFAQ.filter((entry) => (category === "All" || entry.category === category) && `${entry.question} ${entry.answer}`.toLowerCase().includes(query.toLowerCase())), [category, query]);

	return <PublicPage eyebrow={`${nexusFAQ.length} constitutional answers`} title={<>The NEXUS knowledge <em>base.</em></>} description="Understand the platform, its workflows, AI boundaries, verification principles, approved pricing, and the rules that protect participants across the property ecosystem."><section className="public-section faq-page-list"><div className="faq-controls"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the NEXUS FAQ" aria-label="Search the NEXUS FAQ" /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter FAQ category"><option>All</option>{faqCategories.map((item) => <option key={item}>{item}</option>)}</select></div><p className="faq-result-count">Showing {visible.length} of {nexusFAQ.length} constitutional answers.</p>{visible.map((entry) => <details key={entry.id}><summary><span className="faq-number">Q{entry.id}</span><span>{entry.question}</span><b>+</b></summary><p>{entry.answer}</p></details>)}</section></PublicPage>;
}
