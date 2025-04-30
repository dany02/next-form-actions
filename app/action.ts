"use server";
import db from "@/lib/db";

export async function getMoreTweets(page: number, take: number){
	const skip = (page - 1) * take;
	const tweets = await db.tweet.findMany({
		skip,
		take: take + 1,
		include:{
			user: true,
		},
		orderBy:{
			created_at: "desc",
		}
	});

	return tweets;
}