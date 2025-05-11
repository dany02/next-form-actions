"use server";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

const LIMIT_NUMBER = 5;
export async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
		take: LIMIT_NUMBER,
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

export async function getTweetsByPage(page: number){
	const skip = (page - 1) * LIMIT_NUMBER;
	const tweets = await db.tweet.findMany({
		skip,
		take: LIMIT_NUMBER,
		include:{
			user: true,
		},
		orderBy:{
			created_at: "desc",
		}
	});

	return tweets;
}

export async function getTweetTotalCount(){
	return db.tweet.count();
}

export async function getPaginatedTweets(page: number){
	const tweets = await getTweetsByPage(page);
	const TWEETS_TOTAL_COUNT = await getTweetTotalCount();
	const isLastPage = TWEETS_TOTAL_COUNT <= LIMIT_NUMBER*page;
	return {tweets, isLastPage};
}