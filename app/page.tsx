"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { FireIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { handleForm } from "./action";
import { useEffect, useState } from "react";
import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const [state, action] = useFormState(handleForm, null);
	
    const [form, setForm] = useState({
        email: state?.values?.email || "",
        username: state?.values?.username || "",
        password: state?.values?.password || "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setForm({
            email: state?.values?.email || "",
            username: state?.values?.username || "",
            password: state?.values?.password || "",
        });
    }, [state?.values]);

    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <FireIcon className="size-16 text-red-400 mx-auto mb-8" />
                <form action={action} className="flex flex-col gap-4">
                    <FormInput
                        customHtml={<EnvelopeIcon />}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        name="email"
                        defaultValue={form.email}
                        required
                        errors={[]}
                    />
                    <FormInput
                        customHtml={<UserIcon />}
                        onChange={handleChange}
                        type="text"
                        placeholder="Username"
                        name="username"
                        defaultValue={form.username}
                        required
                        errors={[]}
                    />
                    <FormInput
                        customHtml={<KeyIcon />}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        name="password"
                        defaultValue={form.password}
                        required
                        errors={state?.errors ?? []}
                    />

                    <FormBtn text="Log in" />
                </form>
				{state?.success ? (<div className="flex mt-2.5 p-3.5 text-black rounded-2xl bg-green-500"><CheckBadgeIcon className="size-6 mr-4"/>Welcome Back!</div>): null}
            </div>
        </div>
    );
}
