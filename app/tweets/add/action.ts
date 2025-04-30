"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetFormShema = z.object({
	tweet: z.string({required_error: "tweet is required"}).min(10)
});

export async function uploadTweets(_:any, formData:FormData){
	const data = {
		tweet: formData.get("tweet"),
	};

	const result = tweetFormShema.safeParse(data);

	if(!result.success){
		return {
			errors: result.error.flatten(),
			default: data,
		};
	}else{
		const session = await getSession();
		if(session.id){
			const tweets = await db.tweet.create({
				data: {
					tweet: result.data.tweet,
					user: {
						connect:{
							id:session.id,
						}
					}
				},
				select:{
					id:true,
				}
			});
		}
		redirect("/");		 
	}

}