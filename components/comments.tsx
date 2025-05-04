"use client";
import { useOptimistic } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Input from "./input";
import { useActionState } from "react";
import { commentAction } from "@/app/tweets/[id]/action";
import Button from "./button";
import getSession from "@/lib/session";

interface CommentsProps {
    comments: {
        user: {
            username: string;
        };
        userId: number;
        tweetId: number;
        content: string;
    }[];
	username: string;
	id: number;
	userId: number;
}
export default function Comments({ comments, username, id, userId }: CommentsProps) {
    const [state, dispatch] = useActionState(commentAction, null);
    const [optimisticComments, addOptimisticComment] = useOptimistic(
        [...comments],
        (state: any[], newComment: any) => [...state, newComment]
    );
    async function handleSubmit(formData: FormData) {
        const content = formData.get("content") as string;
		const tweetId = id;


        const newComment = {
            user: {
                username: username, 
            },
			userId,
			tweetId,
            content,
        };
        addOptimisticComment(newComment);

        await dispatch(formData);
    }
    return (
        <>
            <form action={dispatch} className="w-full flex flex-row gap-2">
                <div className="w-75">
                    <Input
                        iconHtml={<PencilIcon />}
                        name="content"
                        type="text"
                        placeholder="Please enter your comment..."
                        required
                        errors={state?.errors.formErrors}
                    />
                </div>
                <Input name="tweetId" type="hidden" value={id} />
                <div className="w-20">
                    <Button text={"Add"} />
                </div>
            </form>
            {optimisticComments.map((comment, index) => (
                <div key={index} className="py-3 flex flex-row gap-3 border-b border-neutral-500 last:border-b-0">
                    <div>{comment.user.username} - </div>
                    <div>{comment.content}</div>
                </div>
            ))}
        </>
    );
}
