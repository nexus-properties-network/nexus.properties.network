import { NextResponse } from "next/server";
import { aiEmployeeRegistry } from "@/config/ai-constitution";

type ChatRequest = {
  assistantId?: number;
  message?: string;
  history?: Array<{ role: "assistant" | "user"; content: string }>;
};

function governedFallback(assistant: (typeof aiEmployeeRegistry)[number], message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("price") || normalized.includes("listing") || normalized.includes("property")) {
    return `${assistant.name} can help within the ${assistant.department} scope. I do not have a connected live property record for this request yet, so I will not invent a listing, price, availability, or ownership claim. Please use Search Properties or submit verified data first.`;
  }
  if (normalized.includes("who are you") || normalized.includes("what can you")) {
    return `I am ${assistant.name}, responsible for ${assistant.mission.toLowerCase()} My confidence threshold is ${assistant.confidenceThreshold}%, and requests outside my approved scope escalate to ${assistant.reportsTo.replace("_", " ")}.`;
  }
  return `I received your request. ${assistant.name} operates in the ${assistant.department} division, but live platform data is not connected in this preview. I can provide governed guidance, and I will say “Not Available” rather than invent an answer.`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;
    const assistant = aiEmployeeRegistry.find((item) => item.id === body.assistantId);
    const message = body.message?.trim();
    if (!assistant || !message) return NextResponse.json({ error: "Choose an assistant and enter a message." }, { status: 400 });

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return NextResponse.json({ reply: governedFallback(assistant, message), provider: "governed-fallback" });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: `You are ${assistant.name}, a governed Nexus OS AI employee. Mission: ${assistant.mission} Department: ${assistant.department}. You may use only information supplied in the conversation. Never invent listings, prices, ownership, payments, users, approvals, or statistics. If information is unavailable, say Not Available and escalate to ${assistant.reportsTo}. Stay within scope.` },
          ...(body.history ?? []).slice(-10).map((item) => ({ role: item.role, content: item.content })),
        ],
      }),
    });
    const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }>; error?: { message?: string } };
    if (!response.ok) return NextResponse.json({ error: data.error?.message ?? "The AI provider is unavailable." }, { status: 502 });
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "Not Available", provider: "openai" });
  } catch {
    return NextResponse.json({ error: "Unable to process this assistant request." }, { status: 500 });
  }
}
