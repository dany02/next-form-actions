"use client";
import { handleForm } from "@/app/action";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

interface IFormInput {
	customHtml: React.ReactElement;
	type: string;
	placeholder: string;
	name: string;
	required: boolean;
	errors: string[];
	defaultValue?: string;
	onChange: any;

}


export default function FormInput({customHtml, type, placeholder, name, required, errors, defaultValue, onChange}: IFormInput) {
    return (
		<>
			<div className="relative">
				{React.Children.map(customHtml, (child) => 
					React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, 
					{ className: 'absolute left-4 top-2/4 size-4 text-neutral-600 translate-y-[-50%]' }) : child
				)}
				<input
					onChange={onChange}
					name={name}
					type={type}
					placeholder={placeholder}
					required={required}
					value={defaultValue}
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
