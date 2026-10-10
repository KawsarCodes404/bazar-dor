"use client";

import { authClient } from "@/lib/auth-client";
import AuthProviderButtons from "@/component/AuthProviderButtons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const callback = searchParams.get("callbackURL");
    if (callback && callback !== "/") toast("এই পৃষ্ঠাটি দেখতে সাইন ইন করুন।");
  }, [searchParams]);
  const error = searchParams.get("error");
  const socialError = error ? (error === "account_not_linked"
    ? "এই ইমেইলে আগে থেকেই অ্যাকাউন্ট আছে। ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।"
    : "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।") : "";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      callbackURL: searchParams.get("callbackURL") || "/",
    });
    setBusy(false);
    if (error) return toast.error(error.message || "সাইন ইন করা যায়নি।");
    toast.success("সাইন ইন সফল হয়েছে।");
    router.push(searchParams.get("callbackURL") || "/");
    router.refresh();
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({ provider, callbackURL: searchParams.get("callbackURL") || "/", errorCallbackURL: "/signin" });
  }

  return <section className="auth-area">
    <div className="auth-heading"><h1>সাইন ইন</h1><p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p></div>
    <form className="auth-card" onSubmit={onSubmit}>
      {socialError && <p className="form-error" role="alert">{socialError}</p>}
      <label className="auth-field">ইমেইল<input className="auth-input" name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
      <label className="auth-field">পাসওয়ার্ড<input className="auth-input" name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" autoComplete="current-password" required /></label>
      <button className="btn-brand w-full auth-submit" type="submit" disabled={busy}>{busy ? "অপেক্ষা করুন…" : "সাইন ইন"}</button>
      <div className="auth-divider"><span>অথবা</span></div>
      <AuthProviderButtons onGoogle={() => social("google")} onGitHub={() => social("github")} />
      <p className="auth-switch">অ্যাকাউন্ট নেই? <Link href="/signup">সাইন আপ করুন</Link></p>
    </form>
    <Link className="auth-back" href="/">← হোম পেজে ফিরে যান</Link>
  </section>;
}

export default function SignInPage() {
  return <Suspense fallback={<div className="auth-area" role="status">লোড হচ্ছে…</div>}><SignInForm /></Suspense>;
}
