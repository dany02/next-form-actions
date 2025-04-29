"use server";
import db from "@/lib/db";

export const isUsernameExist = async(username: string)=>{
	const user = await db.user.findUnique({
		where: {
			username
		},
		select: {
			id:true
		}
	});

	return Boolean(user);
}

export const isEmailExist = async(email: string)=>{
	const user = await db.user.findUnique({
		where: {
			email
		},
		select: {
			id:true
		}
	});

	return Boolean(user);
}