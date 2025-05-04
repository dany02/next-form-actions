"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";


export async function likeTweet(tweetId:number){
	const session = await getSession();
	try{
		await db.like.create({
			data: {
				tweetId,
				userId: session.id!,
			}
		});
		revalidateTag(`tweet-like-${tweetId}`);
	}catch(e){}
};

export async function dislikeTweet(tweetId:number){
	const session = await getSession();
	try{
		await db.like.delete({
			where:{
				id:{
					tweetId,
					userId: session.id!,
				}
			}
		});
		revalidateTag(`tweet-like-${tweetId}`);
	}catch(e){console.log("err");}
};

const contentSchema = z.string({required_error: "Comment is required."}).trim();

export async function commentAction(_:any, formData:FormData){
	const content = formData.get("content");
	const tweetIdStr = formData.get("tweetId");
	const tweetId = Number(tweetIdStr);

	const result = contentSchema.safeParse(content);

	if(!result.success){
		return {
			errors: result.error.flatten(),
		}
	}else{
		console.log(result.data)
		const session = await getSession();
		try{
			await db.comment.create({
				data:{
					content: result.data,
					userId: session.id!,
					tweetId: tweetId,
				},
				select: {
					id:true,
				}			
			});
			revalidateTag(`tweet-${tweetId}`);
		}catch(e){}
		
	}


}