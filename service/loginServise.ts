"use server";
import db from "@/lib/db";

export const checkEmailExists = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email
		},
		select: {
			id: true
		}
	});

	return Boolean(user);
};

export const checkUsernameExists = async (username: string) => {
	const user = await db.user.findUnique({
		where: {
			username
		},
		select: {
			id: true
		}
	});

	return Boolean(user);
}