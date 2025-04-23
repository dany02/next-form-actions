"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { EnvelopeIcon, KeyIcon, UserIcon, FireIcon } from "@heroicons/react/16/solid";
import { loginForm } from "./action";
import React, { useActionState } from "react";
import SuccessMessage from "@/components/success-message";


export default function Home() {
    const [state, action] = useActionState(loginForm, null);

    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <FireIcon className="size-16 text-red-400 mx-auto mb-8" />
                <form action={action} className="flex flex-col gap-4">
                    <FormInput
                        iconHtml={<EnvelopeIcon />}
                        type="email"
                        placeholder="Email"
                        name="email"
                        defaultValue={state?.default?.email as string}
                        required
                        errors={state?.errors?.fieldErrors.email}
                    />
                    <FormInput
                        iconHtml={<UserIcon />}
                        type="text"
                        placeholder="Username"
                        name="username"
                        defaultValue={state?.default?.username as string}
                        required
                        errors={state?.errors?.fieldErrors.username}
                    />
                    <FormInput
                        iconHtml={<KeyIcon />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        defaultValue={state?.default?.password as string}
                        required
                        errors={state?.errors?.fieldErrors.password}
                    />

                    <FormBtn text="Log in" />
                </form>
				{state?.success && <SuccessMessage/>}
            </div>
        </div>
    );
}
