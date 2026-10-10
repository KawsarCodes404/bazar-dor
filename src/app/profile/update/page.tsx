"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!isPending && !user) router.replace("/signin?callbackURL=/profile/update"); }, [isPending, user, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return toast.error("আপনার নাম লিখুন।");
    setBusy(true);
    const { error } = await authClient.updateUser({ name });
    setBusy(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
    toast.success("প্রোফাইল আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  if (isPending || !user) return <section className="profile-page"><div className="profile-skeleton" role="status">লোড হচ্ছে…</div></section>;
  return <section className="profile-page">
    <div className="profile-heading"><h1>প্রোফাইল আপডেট</h1><p>আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p></div>
    <form className="profile-panel profile-info-panel" onSubmit={onSubmit}>
      <label className="auth-field">নাম<input className="auth-input" name="name" defaultValue={user.name || ""} autoComplete="name" required /></label>
      <button className="btn-brand w-full" type="submit" disabled={busy}>{busy ? "আপডেট হচ্ছে…" : "আপডেট"}</button>
      <Link className="auth-back" href="/profile">ফিরে যান</Link>
    </form>
  </section>;
}
