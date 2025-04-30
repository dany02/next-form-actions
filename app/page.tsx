
import TweetsList from "@/components/tweets-list";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import { PlusIcon } from "@heroicons/react/16/solid";
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
        <div className="pt-3 px-5 w-full min-h-screen">
			<div className="flex justify-end">
				<Link href={"/tweets/add"} className="self-end">
					<PlusIcon className="size-10" />
				</Link>
			</div>
			<div className="">
				<TweetsList initialTweets={initialTweets}/>
			</div>
        </div>
    );
}
