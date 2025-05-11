"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export const getEditUser = async()=>{
	const session = await getSession();
	const user = await db.user.findUnique({
		where:{
			id: session.id,
		},
		select: {
			id:true,
			email:true,
			username:true,
			bio:true,
		},
	});
	return user;
}

export const editUsernameExist = async(username: string)=>{
	const session = await getSession();
	const user = await db.user.findUnique({
		where:{
			username,
		},
		select:{
			id:true,
		}
	});
	
	if(user && user.id === session.id) {
		return false;
	}

	return Boolean(user);
}

export const editEmailExist = async(email: string)=>{
	const session = await getSession();
	const user = await db.user.findUnique({
		where:{
			email,
		},
		select:{
			id:true,
		}
	});
	
	if(user && user.id === session.id) {
		return false;
	}
	
	return Boolean(user);
}