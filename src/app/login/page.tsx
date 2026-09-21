import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
export default function LoginPage() { return <main className="auth-page"><div className="auth-card"><Link href="/"><img src="/nexus-assets/transparentlogo.png" alt="Nexus Property Network" /></Link><p className="kicker">Welcome back</p><h1>Sign in to your <em>Nexus</em> workspace.</h1><AuthForm mode="login" /><p className="auth-note">New to Nexus? <Link href="/register">Create an account</Link></p></div></main>; }
