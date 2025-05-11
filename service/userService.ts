"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";

export const isUsernameExist = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user);
};

export const isEmailExist = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user);
};

export const getUserName = async()=>{
	const session = await getSession();
	const user = await db.user.findUnique({
		where: {
			id: session.id,
		},
		select: {
			id:true,
			username: true,
		}
	});

	return user;
}