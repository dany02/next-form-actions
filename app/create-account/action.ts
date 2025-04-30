"use server";
import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
	USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { isEmailExist, isUsernameExist } from "@/service/userService";


const checkPasswords = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => {
    return password === confirm_password;
};

const formSchema = z
    .object({
        username: z.string({
			invalid_type_error: "Username must be a string.",
			required_error: "Username is required.",
		  }).trim().min(USERNAME_MIN_LENGTH, `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`),
        email: z.string({
			required_error: "Email is required.",
		  }).email("Please enter a valid email address.").trim()
		  .refine((email) => email.includes("@zod.com"), "Only @zod.com email addresses are allowed."),
        password: z
            .string()
            .min(PASSWORD_MIN_LENGTH, `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`)
            .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    })
	.superRefine(async({username}, ctx)=>{
		const user = await isUsernameExist(username);
		if(user){
			ctx.addIssue({
				code: 'custom',
				message: "This username is already taken",
				path: ["username"],
				fatal: true,
			});
			return z.NEVER;
		}
	})
	.superRefine((async({email}, ctx)=>{
		const user = await isEmailExist(email);
		if(user){
			ctx.addIssue({
				code:'custom',
				message: "This email is already taken",
				path: ["email"],
				fatal:true,
			});
		}
		return z.NEVER;
	}))
    .refine(checkPasswords, {
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

	const result = await formSchema.spa(data);

	if(!result.success){
		return {
			errors: result.error.flatten(),
			default: data,
		}
	}else {
		const hashedPassword = await bcrypt.hash(result.data.password, 12);
		const user = await db.user.create({
			data: {
				username: result.data.username,
				email: result.data.email,
				password: hashedPassword,
			},
			select: {
				id: true
			}
		});
		 const session = await getSession();
		 session.id = user.id;
		 await session.save();
		 redirect("/"); 
	}
}
