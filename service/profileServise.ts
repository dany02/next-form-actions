"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";

export const getCurrentUser = async (username: string) => {
    const session = await getSession();
    const user = await db.user.findUnique({
        where: {
            id: session.id,
            username,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user);
};

export const getUserProfile = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
            username: true,
            email: true,
			bio:true,
            tweets: {
                select: {
                    id: true,
                    tweet: true,
                    created_at: true,
                },
            },
        },
    });
    return user;
};
