"use server";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

export async function checkSearch(term:string){
	const searchText = await db.tweet.findMany({
		where:{
			tweet:{
				contains: term
			}
		},
		select:{
			id:true
		}
	});

	if(searchText.length < 1) {
		return false
	}
	return true;
}

export async function getSearchResult(term: string){
	const searchResult = await db.tweet.findMany({
		where:{
			tweet:{
				contains: term,
			}
		},
		include:{
			user: {
				select: {
					username: true,
				},
			},
		},
		orderBy: {
			created_at: "desc",
		},
	});
	return searchResult;
}
export type InitialSearchs = Prisma.PromiseReturnType<typeof getSearchResult>;