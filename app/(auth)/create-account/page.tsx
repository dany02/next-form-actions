"use client";

import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { createAccount } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
    const [state, dispatch] = useActionState(createAccount, null);
    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-md pt-40">
                <form action={dispatch} className="flex flex-col gap-4">
                    <Input
                        iconHtml={<UserIcon />}
                        type="text"
                        placeholder="Username"
                        name="username"
                        defaultValue={state?.default?.username as string}
                        required
						minLength={3}
						maxLength={10}
                        errors={state?.errors?.fieldErrors.username}
                    />
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
                        iconHtml={<KeyIcon />}
                        type="password"
                        placeholder="Password"
                        name="password"
                        defaultValue={state?.default?.password as string}
                        required
						minLength={PASSWORD_MIN_LENGTH}
                        errors={state?.errors?.fieldErrors.password}
                    />
                    <Input
                        iconHtml={<KeyIcon />}
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        defaultValue={state?.default?.password as string}
                        required
						minLength={PASSWORD_MIN_LENGTH}
                        errors={state?.errors?.fieldErrors.password}
                    />

                    <Button text="Create Account" />
                </form>
            </div>
        </div>
    );
}
