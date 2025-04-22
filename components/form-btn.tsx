"use client";
import { useFormStatus } from "react-dom";

interface IFormBtn{
	text: string;
}

export default function FormBtn({text}:IFormBtn) {
	const {pending} = useFormStatus();
    return (
        <button disabled={pending} className="w-full h-12 text-sm font-bold rounded-full bg-neutral-200 cursor-pointer disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
            {pending? "Loading..." : text}
        </button>
    );
}
