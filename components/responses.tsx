"use client";
import { useOptimistic } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import { useActionState } from "react";
import { responseSchema } from "@/lib/scehma";
import { formatToTimeAgo } from "@/lib/utils";
import { addTweetResponse } from "@/app/(tabs)/tweets/[id]/action";
import { InitialResponses } from "@/app/(tabs)/tweets/[id]/page";

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
            <form action={dispatch} className="w-full grid grid-cols-[3fr_1fr] gap-3.5">
                <div>
                    <Input
                        iconHtml={<PencilIcon />}
                        name="text"
                        type="text"
                        placeholder="Please enter your comment..."
                        required
                        errors={state?.fieldErrors[0]}
                    />
					<input className="hidden" name="tweetId" type="hidden" value={tweetId}/>
                </div>
                <button className="bg-stone-300 rounded-full p-3">Add</button>
            </form>

			<div className="divider"></div>
			
            {responses.map((response) => (
                <div key={response.id} className="py-5 mb-0 flex flex-row gap-3 border-b border-neutral-400 last:border-b-0">
					<div>
						<div className="avatar avatar-placeholder">
							<div className="bg-neutral text-neutral-content w-12 rounded-full">
								<span className="font-bold text-[16px] uppercase">{response.user.username.charAt(0)!}</span> 
							</div>
						</div>
					</div>
					<div>
						<div className="text-xs font-bold mb-1 dark:text-white">{response.user.username} <span className="text-[10px] text-neutral-500 font-normal">{formatToTimeAgo(response.created_at.toString())}</span></div>
						<div className="text-sm font-medium break-all dark:text-white">{response.text}</div>
					</div>
                </div>
            ))}
        </>
    );
}
