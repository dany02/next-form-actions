"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
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

const checkUsernameExists = async (username: string) => {
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


const loginSchema = z.object({
    email: z
        .string()
        .email()
		.trim()
		.toLowerCase()
		.refine(checkEmailExists, "An account with this email does not exists."),
    username: z
        .string()
        .min(3, { message: "Username should be at least 5 characters long." })
		.trim()
		.toLowerCase()
		.refine(checkUsernameExists, "An account with this username does not exists."),
    password: z
        .string({required_error: "Password is required",})
});


export async function loginForm(prevState:any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
    };

    const result = await loginSchema.spa(data);


	if(!result.success){
		return{
			default: data,
			errors: result.error.flatten(),
			success: result.success,
		}
	}else{
		const user = await db.user.findUnique({
			where: {
				email: result.data.email,
			},
			select: {
				id: true,
				password: true,
			}
		});

		const ok = await bcrypt.compare(result.data.password, user!.password ?? 'dddd');

		if(ok){
			const session = await getSession();
			session.id = user!.id;
			await session.save();
			redirect("/");
		}else{
			return{
				fieldErrors:{
					password: ["Wrong password."],
					email:[],
					username:[],
				}
			}
		}
	}


}
