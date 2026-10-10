'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, image: string, password: string };

        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            console.log(data);
            redirect('/');
        }

        if (error) {
            console.log(error);
        }
    }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }

    const handleGithubSignin = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    }


    return (
        <div className="mt-5">
            <h2 className="text-2xl font-bold text-center mb-1 text-red-700">সাইন আপ</h2>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset rounded-box w-md">
                    <label className="label">নাম</label>
                    <input name="name" type="text" className="input w-md" placeholder="Name" />

                    <label className="label">Image</label>
                    <input name="image" type="url" className="input w-md" placeholder="Image" />

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className="input w-md" placeholder="Email" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input w-md" placeholder="Password" />

                    <button type="submit" className="btn btn-neutral mt-4 bg-red-600">সাইন আপ করুন</button>
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

export default SignUpPage;