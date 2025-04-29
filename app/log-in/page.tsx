"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import {
    EnvelopeIcon,
    KeyIcon,
    UserIcon,
    FireIcon,
} from "@heroicons/react/16/solid";
import { loginForm } from "./action";
import React, { useActionState } from "react";
import SuccessMessage from "@/components/success-message";
import Link from "next/link";

export default function Login() {
    const [state, dispatch] = useActionState(loginForm, null);

    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <FireIcon className="size-16 text-red-400 mx-auto mb-8" />
                <form action={dispatch} className="flex flex-col gap-4">
                    <Input
                        iconHtml={<EnvelopeIcon />}
                        type="email"
                        placeholder="Email"
                        name="email"
                        defaultValue={state?.default?.email as string}
                        required
                        errors={state?.errors?.fieldErrors.email}
                    />
                    <Input
                        iconHtml={<UserIcon />}
                        type="text"
                        placeholder="Username"
                        name="username"
                        defaultValue={state?.default?.username as string}
                        required
                        errors={state?.errors?.fieldErrors.username}
                    />
                    <Input
                        iconHtml={<KeyIcon />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        defaultValue={state?.default?.password as string}
                        required
                        errors={state?.errors?.fieldErrors.password}
                    />

                    <Button text="Log in" />
                    {state?.success && <SuccessMessage />}
                </form>

                <div className="mt-5 flex justify-center items-center gap-5 *:text-center">
                    <span className="text-sm">처음이신가요?</span>
                    <Link
                        href="/create-account"
                        className="basic-btn w-52 text-center leading-12 hover:underline hover:text-stone-400"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
