"use client";
import React, { InputHTMLAttributes } from "react";

interface IInput {
	iconHtml: React.ReactNode;
	name: string;
	errors?: string[];
}


export default function Input({iconHtml, name,  errors = [], ...rest}: IInput & InputHTMLAttributes<HTMLInputElement>) {
    return (
		<>
			<div className="relative">
				<label htmlFor={name} className="absolute left-4 top-2/4 text-neutral-600 translate-y-[-50%] *:size-4">
					{iconHtml}
				</label>
				<input
					id={name}
					name={name}
					{...rest}
					className={`w-full h-12 pl-12 pr-5 text-sm font-medium rounded-full border-[1px] border-neutral-400
										outline-0 focus:ring-1 ring-neutral-500 ring-offset-2 ${errors.length > 0 ? 'border-red-500 ring-red-500':''}`}
				/>
			</div>
			{errors.map((error, index) => (
				<span key={index} className="text-red-500 text-sm font-medium mt-1">{error}</span>
			))}
		</>
    );
}
