"use server";
import db from "@/lib/db";

export async function getMoreTweets(page: number, take: number){
	const skip = page * take;
	const tweets = await db.tweet.findMany({
		skip,
		take: take + 1,
		include:{
			user: {
                select: {
                    username: true,
                },
            },
		},
		orderBy:{
			created_at: "desc",
		}
	});

	return tweets;
}