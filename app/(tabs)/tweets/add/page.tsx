"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useActionState } from "react";
import { uploadTweets } from "./action";

export default function TweetCreate(){
	const [state, dispatch] = useActionState(uploadTweets, null);
	return(
		<div className="w-md mx-auto pt-40">
			<form action={dispatch} className="flex flex-col gap-4">
				<Input
					iconHtml={<DocumentTextIcon/>}
					type="text"
					name="tweet"
					placeholder="Please write a tweet."
					defaultValue={state?.default?.tweet as string}
					required
					errors={state?.errors?.fieldErrors.tweet}
				
				/>	
				<Button text="Create Tweet" />
			</form>
		</div>
	);
}