"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: Readonly<{ mode: "login" | "register" }>) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const result = mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName, role } } });

      if (result.error) throw result.error;
      if (mode === "register") {
        setMessage("Account created. Check your email if confirmation is enabled.");
      } else {
        router.push("/dashboards");
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return <form className="auth-form" onSubmit={submit}>{mode === "register" && <label>Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" /></label>}<label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" /></label>{mode === "register" && <label>I am joining as<select value={role} onChange={(event) => setRole(event.target.value)}><option value="buyer">Buyer</option><option value="seller">Seller</option><option value="agent">Agent</option><option value="investor">Investor</option><option value="developer">Developer</option></select></label>}<button className="button button-primary" disabled={pending}>{pending ? "Working..." : mode === "login" ? "Sign in" : "Create account"} <span>-&gt;</span></button>{message && <p className="auth-form-message" role="status">{message}</p>}</form>;
}
