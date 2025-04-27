"use client";
import { useFormStatus } from "react-dom";

interface IFormBtn{
	text: string;
}

export default function Button({text}:IFormBtn) {
	const {pending} = useFormStatus();
    return (
        <button disabled={pending} className="basic-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
            {pending? "Loading..." : text}
        </button>
    );
}
