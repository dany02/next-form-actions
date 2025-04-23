"use server";

import { z } from "zod";

const passwordRegex = new RegExp(/(?=.*\d)/);
const checkEmail = (email: string) => email.endsWith("@zod.com");

const loginSchema = z.object({
    email: z
        .string()
        .email()
		.trim()
		.toLowerCase()
        .refine(
            checkEmail,
            "Only @zod.com emails are allowed"
        ),
    username: z
        .string()
        .min(5, { message: "Username should be at least 5 characters long." }),
    password: z
        .string()
        .min(10, { message: "Password should be at least 10 characters long." })
        .regex(passwordRegex, "Password should contain at least one number(0123456789)."),
});


export async function loginForm(prevState:any, formData: FormData) {
    const data = {
        email: formData.get("email")?.toString() || "",
        username: formData.get("username")?.toString() || "",
        password: formData.get("password")?.toString() || "",
    };

    const result = loginSchema.safeParse(data);


	if(!result.success){
		return{
			default: data,
			errors: result.error.flatten(),
			success: result.success,
		}
	}

	return{
		default: data,
		success: result.success,
	}
}
