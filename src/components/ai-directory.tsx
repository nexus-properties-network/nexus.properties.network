"use client";

import { FormEvent, useState } from "react";
import { aiEmployeeRegistry } from "@/config/ai-constitution";

type ChatMessage = { role: "assistant" | "user"; content: string };

export function AIDirectory() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const selected = aiEmployeeRegistry.find((assistant) => assistant.id === selectedId) ?? null;
  const visible = aiEmployeeRegistry.filter((assistant) => assistant.name.toLowerCase().includes(query.toLowerCase()) || assistant.department.toLowerCase().includes(query.toLowerCase()));
  
  function openAssistant(id: number) {
    const assistant = aiEmployeeRegistry.find((item) => item.id === id);
    setSelectedId(id);
    setMessages(assistant ? [{ role: "assistant", content: `I am ${assistant.name}. I operate within the ${assistant.department} division. Ask me about my approved responsibilities, and I will escalate anything outside my scope.` }] : []);
    setInput("");
  }
  
  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !input.trim() || pending) return;
    const userMessage = input.trim();
    const nextMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(nextMessages);
    setInput("");
    setPending(true);
    try {
      const response = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ assistantId: selected.id, message: userMessage, history: nextMessages }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Assistant unavailable");
      setMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((current) => [...current, { role: "assistant", content: error instanceof Error ? error.message : "The assistant is temporarily unavailable." }]);
    } finally {
      setPending(false);
    }
  }
  
  return <section className="ai-directory section-padding" id="ai-assistants"><div className="section-heading-row"><div><p className="kicker">Nexus OS Workforce</p><h2>54 governed AI employees for every <em>property decision.</em></h2><p>Each assistant has a defined role, memory boundary, confidence threshold, and escalation path.</p></div><select className="ai-select" onChange={(event) => event.target.value && openAssistant(Number(event.target.value))} defaultValue=""><option value="">Select an AI Employee</option>{aiEmployeeRegistry.map((assistant) => <option value={assistant.id} key={assistant.id}>#{String(assistant.id).padStart(2, "0")} {assistant.name}</option>)}</select></div><div className="ai-directory-toolbar"><span>{visible.length} specialists available</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employees or divisions" /></div><div className="ai-directory-grid">{visible.map((assistant) => <article className="ai-directory-card" key={assistant.id}><div className="ai-card-top"><span>#{String(assistant.id).padStart(2, "0")}</span><span className="ai-status"><i /> {assistant.status}</span></div><h3>{assistant.name}</h3><small>{assistant.department} · {assistant.confidenceThreshold}% confidence</small><p>{assistant.mission}</p><button className="button button-dark" onClick={() => openAssistant(assistant.id)}>Open assistant <span>-&gt;</span></button></article>)}</div>{selected && <div className="ai-chat-backdrop" role="presentation" onClick={() => setSelectedId(null)}><section className="ai-chat-panel" role="dialog" aria-modal="true" aria-label={`${selected.name} chat`} onClick={(event) => event.stopPropagation()}><button className="ai-chat-close" onClick={() => setSelectedId(null)} aria-label="Close chat">×</button><p className="kicker">Nexus AI Employee #{String(selected.id).padStart(2, "0")}</p><h3>{selected.name}</h3><div className="ai-chat-messages">{messages.map((message, index) => <div className={`ai-message ${message.role === "user" ? "user-message" : "assistant-message"}`} key={`${message.role}-${index}`}>{message.content}</div>)}{pending && <div className="ai-message assistant-message">Reviewing approved scope...</div>}</div><form className="ai-chat-input" onSubmit={sendMessage}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask this assistant..." disabled={pending} /><button className="button button-primary" disabled={pending || !input.trim()}>{pending ? "..." : "Send"}</button></form><span className="ai-chat-note">Reports to {selected.reportsTo.replace("_", " ")}. Responses are governed and auditable.</span></section></div>}</section>;
}
