import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
export default function RegisterPage() { return <main className="auth-page"><div className="auth-card"><Link href="/"><img src="/nexus-assets/transparentlogo.png" alt="Nexus Property Network" /></Link><p className="kicker">Join the network</p><h1>Build your trusted property <em>workflow.</em></h1><AuthForm mode="register" /><p className="auth-note">Already registered? <Link href="/login">Sign in</Link></p></div></main>; }
