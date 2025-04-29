
import TweetsList from "@/components/tweets-list";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { useState } from "react";



async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
		take:5,
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
		orderBy: {
			created_at: "desc",
		}
    });
    return tweets;
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialTweets>;
export default async function Home() {
    const initialTweets = await getInitialTweets();

    return (
        <div className="w-d min-h-screen flex justify-center bg-neutral-100">
			<TweetsList initialTweets={initialTweets}/>
        </div>
    );
}
