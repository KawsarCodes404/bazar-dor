"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("error")) toast.error("সামাজিক অ্যাকাউন্টটি যুক্ত করা যায়নি।");
  }, []);

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) return toast.error(error.message || "সাইন আউট করা যায়নি।");
    toast.success("আপনি সাইন আউট করেছেন।");
    router.push("/");
    router.refresh();
  }

  async function updateName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get("name") ?? "").trim();
    if (!name) return toast.error("আপনার নাম লিখুন।");
    setSaving(true);
    const { error } = await authClient.updateUser({ name });
    setSaving(false);
    if (error) return toast.error(error.message || "নাম আপডেট করা যায়নি।");
    toast.success("নাম আপডেট হয়েছে।");
    router.refresh();
  }

  if (isPending) return <section className="profile-page"><div className="profile-skeleton" role="status">প্রোফাইল লোড হচ্ছে…</div></section>;
  if (!user) return <section className="profile-page"><div className="profile-panel"><h1>প্রোফাইল দেখতে সাইন ইন করুন</h1><Link className="btn-brand mt-5 inline-flex" href="/signin">সাইন ইন</Link></div></section>;

  return <section className="profile-page">
    <div className="profile-heading"><h1>আমার প্রোফাইল</h1><p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p></div>
    <div className="profile-panel profile-user-card">
      <span className="profile-avatar">{user.image ? <Image src={user.image} alt="" width={56} height={56} unoptimized /> : (user.name?.trim().charAt(0).toUpperCase() || "U")}</span>
      <div className="min-w-0 flex-1"><h2>{user.name || "ব্যবহারকারী"}</h2><p>{user.email}</p></div>
      <button className="btn-danger-outline" onClick={signOut} type="button"><span aria-hidden="true">↩</span><span>সাইন আউট</span></button>
    </div>
    <form className="profile-panel profile-info-panel" onSubmit={updateName}>
      <h2>তথ্য</h2>
      <label className="auth-field">নাম<input className="auth-input" name="name" autoComplete="name" required /></label>
      <button className="btn-brand w-full profile-update-link" type="submit" disabled={saving}>{saving ? "আপডেট হচ্ছে…" : "আপডেট"}</button>
    </form>
  </section>;
}
