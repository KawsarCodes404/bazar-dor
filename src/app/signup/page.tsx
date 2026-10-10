"use client";

import { authClient } from "@/lib/auth-client";
import AuthProviderButtons from "@/component/AuthProviderButtons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    if (password !== form.get("confirmPassword")) return toast.error("দুটি পাসওয়ার্ড মিলছে না।");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password, callbackURL: "/" });
    setBusy(false);
    if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: "/", errorCallbackURL: "/signup" });
  }

  return <section className="auth-area">
    <div className="auth-heading"><h1>অ্যাকাউন্ট তৈরি করুন</h1><p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p></div>
    <form className="auth-card" onSubmit={onSubmit}>
      <label className="auth-field">নাম<input className="auth-input" name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" autoComplete="name" required /></label>
      <label className="auth-field">ইমেইল<input className="auth-input" name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
      <label className="auth-field">পাসওয়ার্ড<input className="auth-input" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="new-password" minLength={8} required /></label>
      <label className="auth-field">পাসওয়ার্ড নিশ্চিত করুন<input className="auth-input" name="confirmPassword" type="password" placeholder="আবার লিখুন" autoComplete="new-password" required /></label>
      <button className="btn-brand w-full" type="submit" disabled={busy}>{busy ? "অপেক্ষা করুন…" : "অ্যাকাউন্ট তৈরি করুন"}</button>
      <div className="auth-divider"><span>অথবা</span></div>
      <AuthProviderButtons onGoogle={() => social("google")} onGitHub={() => social("github")} />
      <p className="auth-switch">অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করুন</Link></p>
    </form>
    <Link className="auth-back" href="/">← হোম পেজে ফিরে যান</Link>
  </section>;
}
