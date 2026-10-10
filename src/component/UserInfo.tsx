"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Avatar({ name, image }: { name?: string | null; image?: string | null }) {
  return (
    <span
      className="user-avatar"
      aria-hidden="true"
      style={image ? { backgroundImage: `url("${image.replaceAll('"', "\\\"")}")` } : undefined}
    >
      {!image && (name?.trim().charAt(0).toUpperCase() || "U")}
    </span>
  );
}

export default function UserInfo() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("আপনি সাইন আউট করেছেন।");
    router.push("/");
    router.refresh();
  };

  if (isPending) return <span className="h-10 w-28 animate-pulse rounded-full bg-mist" aria-label="প্রোফাইল লোড হচ্ছে" />;

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-brand btn-sm sm:btn-md">সাইন আপ</Link>
      </div>
    );
  }

  return (
    <details className="profile-menu">
      <summary className="profile-menu-trigger">
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{user.name || "প্রোফাইল"}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-muted"><path d="m5 7 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <div className="profile-menu-popover">
        <p className="font-semibold text-ink">{user.name || "ব্যবহারকারী"}</p>
        <p className="mt-0.5 truncate text-xs text-muted">{user.email}</p>
        <div className="my-3 border-t border-line" />
        <Link className="profile-menu-item" href="/profile"><span className="profile-menu-item-content"><span className="profile-menu-icon" aria-hidden="true">👤</span>আমার প্রোফাইল</span></Link>
        <button className="profile-menu-item profile-menu-signout" type="button" onClick={handleSignOut}><span className="profile-menu-item-content"><span className="profile-menu-icon" aria-hidden="true">↩</span>সাইন আউট</span></button>
      </div>
    </details>
  );
}
