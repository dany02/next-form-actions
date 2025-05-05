"use client";
import { useOptimistic } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import { useActionState } from "react";
import { addTweetResponse } from "@/app/tweets/[id]/action";
import Button from "./button";
import { InitialResponses } from "@/app/tweets/[id]/page";
import { responseSchema } from "@/lib/scehma";

export default function Responses({ initialResponses, username, tweetId }:{initialResponses:InitialResponses, username:string, tweetId:number}) {
    const [responses, optimisticResponse] = useOptimistic(
        initialResponses,
        (previousResponse, responseOptimisticValue: string) => {
			return [
				...previousResponse,
				{
					id: new Date().getDate(),
					text: responseOptimisticValue,
					created_at: new Date(),
					tweetId,
					user: {username, id: Infinity},
				}
			]
		}
    );

	const handleUploadResponse = (_: unknown, formData: FormData) => {
		console.log("handle");
		const result = responseSchema.safeParse(formData.get("text"));
		if(result.success){
			optimisticResponse(result.data);
			addTweetResponse(formData);
		}else{
			return result.error.flatten();
		}

	};

	const [state, dispatch] = useActionState(handleUploadResponse, null);

    return (
        <>
            <form action={dispatch} className="w-full flex flex-row gap-2">
                <div className="w-75">
                    <Input
                        iconHtml={<PencilIcon />}
                        name="text"
                        type="text"
                        placeholder="Please enter your comment..."
                        required
                        errors={state?.fieldErrors[0]}
                    />
                </div>
				<input className="hidden" name="tweetId" type="hidden" value={tweetId}/>
                <button className="w-20 bg-stone-300 rounded-full p-3">Add</button>
            </form>
            {responses.map((response) => (
                <div key={response.id} className="py-3 flex flex-row gap-3 border-b border-neutral-500 last:border-b-0">
                    <div>{response.user.username} - </div>
                    <div>{response.text}</div>
                </div>
            ))}
        </>
    );
}
