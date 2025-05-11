"use server";
import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_REGEX,
    PASSWORD_REGEX_ERROR,
    USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { editEmailExist, editUsernameExist } from "@/service/editServise";
import { z } from "zod";
import { redirect } from "next/navigation";

const baseProfileSchema = z.object({
    username: z
        .string({
            invalid_type_error: "Username must be a string.",
            required_error: "Username is required.",
        })
        .trim()
        .min(
            USERNAME_MIN_LENGTH,
            `Username should be at least ${USERNAME_MIN_LENGTH} characters long.`
        ),
    email: z
        .string({
            required_error: "Email is required.",
        })
        .email("Please enter a valid email address.")
        .trim()
        .refine(
            (email) => email.includes("@zod.com"),
            "Only @zod.com email addresses are allowed."
        ),
    bio: z.string().optional(),
});
const checkPasswords = ({
    current_password,
    new_password,
    confirm_password,
}: {
    current_password: string;
    new_password: string;
    confirm_password: string;
}) => {
    return new_password === confirm_password;
};

const passwordSchema = z
    .object({
        current_password: z.string().min(PASSWORD_MIN_LENGTH),
        new_password: z
            .string()
            .min(
                PASSWORD_MIN_LENGTH,
                `Password should be at least ${PASSWORD_MIN_LENGTH} characters long.`
            )
            .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    })
    .refine(checkPasswords, {
        message: "Both passwords should be the same!",
        path: ["confirm_password"],
    });

const profileEditSchema = baseProfileSchema
    .merge(
        z.object({
            current_password: z.string().optional(),
            new_password: z.string().optional(),
            confirm_password: z.string().optional(),
        })
    )
    .superRefine(async ({ username }, ctx) => {
        const user = await editUsernameExist(username);
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This username is already taken",
                path: ["username"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await editEmailExist(email);
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "This email is already taken",
                path: ["email"],
                fatal: true,
            });
        }
        return z.NEVER;
    })
    .superRefine((data, ctx) => {
        const isPasswordChange =
            data.current_password || data.new_password || data.confirm_password;

        if (isPasswordChange) {
            const result = passwordSchema.safeParse({
                current_password: data.current_password,
                new_password: data.new_password,
                confirm_password: data.confirm_password,
            });

            if (!result.success) {
                for (const issue of result.error.issues) {
                    ctx.addIssue(issue);
                }
            }
        }
    });

export async function editForm(prevState: any, formData: FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        bio: formData.get("bio"),
        current_password: formData.get("current_password"),
        new_password: formData.get("new_password"),
        confirm_password: formData.get("confirm_password"),
    };

    const result = await profileEditSchema.spa(data);
	
    if (!result.success) {
        return {
            data,
            errors: result.error.flatten(),
        };
    } else {
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });

		const wantsToChangePassword = result.data.current_password || result.data.new_password || result.data.confirm_password;


        if (wantsToChangePassword) {
            const ok = await bcrypt.compare(result.data.current_password!, user!.password ?? "dddd");

            if (ok) {
                const hashedPassword = await bcrypt.hash(result.data.new_password!,12);
				const updateProfileUser = await db.user.update({
					where:{
						id: user?.id,
					},
					data: {
						username: result.data.username,
						email: result.data.email,
						bio: result.data.bio,
						password: hashedPassword,
					},
					select: {
						id: true,
						username:true,
					}
				});

				redirect(`/users/${updateProfileUser.username}`); 
            } else {
                return {
                    data,
                    errors: {
                        formErrors: [],
                        fieldErrors: {
                            username: [],
                            email: [],
                            bio: [],
                            current_password: ["Wrong password."],
                            new_password: [],
                            confirm_password: [],
                        },
                    },
                };
            }
        }else{
			const updateBaseUser = await db.user.update({
				where:{
					id: user?.id,
				},
				data: {
					username: result.data.username,
					email: result.data.email,
					bio: result.data.bio || '',
				},
				select: {
					id: true,
					username:true,
				}
			});
			redirect(`/users/${updateBaseUser.username}`); 
		}
    }

}
