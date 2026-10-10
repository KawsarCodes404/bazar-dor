'use client'

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const SignInPage = () => {
    const [socialError, setSocialError] = useState<string | null>(null);

    useEffect(() => {
        const error = new URLSearchParams(window.location.search).get("error");
        if (error === "account_not_linked") {
            setSocialError("This email already has an account. Sign in with your email and password, then connect Google or GitHub from your profile.");
        } else if (error) {
            setSocialError("Social sign-in failed. Please try again.");
        }
    }, []);

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string };

        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: '/'
        })

        if (data) {
            toast.success('Sign in successfull');
            console.log(data);
        }

        if (error) {
            toast.error(error.message ?? "Sign in failed. Please try again.")

            console.log(error);
        }
    }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
            errorCallbackURL: "/signin",
        });
    }

    const handleGithubSignin = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
            errorCallbackURL: "/signin",
        });
    }

    return (
        <div className="mt-5">
            <h2 className="text-2xl font-bold text-center mb-1 text-red-700">সাইন ইন</h2>
            {socialError && <p role="alert" className="mx-auto mb-3 max-w-md text-center text-sm text-red-700">{socialError}</p>}

            <form action="" onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md">
                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className="input w-md" placeholder="Email" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input w-md" placeholder="Password" />

                    <button type="submit" className="btn btn-neutral mt-4 bg-red-600">সাইন ইন করুন</button>
                </fieldset>

            </form>

            <div className="mt-1 flex justify-center">
                <button type="button" onClick={handleGoogleSignin} className="btn">Sign in with Google</button>
            </div>

            <div className="mt-1 flex justify-center">
                <button type="button" onClick={handleGithubSignin} className="btn">Sign in with Github</button>
            </div>
        </div>
    );
};

export default SignInPage;
