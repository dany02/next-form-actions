"use server";
import db from "@/lib/db";
import { responseSchema } from "@/lib/scehma";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function likeTweet(tweetId: number) {
    const session = await getSession();
    try {
        await db.like.create({
            data: {
                tweetId,
                userId: session.id!,
            },
        });
        revalidateTag(`tweet-like-${tweetId}`);
    } catch (e) {console.log("err");}
}

export async function dislikeTweet(tweetId: number) {
    const session = await getSession();
    try {
        await db.like.delete({
            where: {
                id: {
                    tweetId,
                    userId: session.id!,
                },
            },
        });
        revalidateTag(`tweet-like-${tweetId}`);
    } catch (e) {
        console.log("err");
    }
}

export async function addTweetResponse(formData: FormData) {
    const text = formData.get("text");
    const tweetId = formData.get("tweetId");

    const result = responseSchema.safeParse(text);

    console.log(result.success);

    if (!result.success) {
        return {
            errors: result.error.flatten(),
        };
    } else {
        const session = await getSession();
        try {
            if (session.id) {
                await db.response.create({
                    data: {
                        text: result.data,
                        userId: session.id!,
                        tweetId: Number(tweetId),
                    },
                });
            }
        } catch (e) {console.log("err");}
        revalidateTag(`tweet-responses-${tweetId}`);
    }
}

export async function deleteTweet(id: number) {
	const session = await getSession();
	await db.tweet.delete({
		where:{
			id,
			userId:session.id,
		},
	});
	redirect("/");
}
