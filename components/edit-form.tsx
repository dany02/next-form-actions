"use client";
import { useActionState } from "react";
import {
    EnvelopeIcon,
    FaceSmileIcon,
    KeyIcon,
    UserIcon,
} from "@heroicons/react/16/solid";
import Input from "./input";
import Button from "./button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { editForm } from "@/app/(tabs)/users/[username]/edit/action";

interface EditFormProps {
    initialUser: {
        id: number;
        email: string;
        username: string;
        bio?: string | null;
    };
}

export default function EditForm({ initialUser }: EditFormProps) {
    const [state, dispatch] = useActionState(editForm, null);

    return (
		<form action={dispatch} className="flex flex-col gap-4">
			<Input
				iconHtml={<UserIcon />}
				type="text"
				placeholder="Username"
				name="username"
				defaultValue={
					state?.data?.username
						? (state?.data?.username as string)
						: initialUser.username
				}
				required
				minLength={3}
				maxLength={10}
				errors={state?.errors?.fieldErrors.username}
			/>
			<Input
				iconHtml={<EnvelopeIcon />}
				type="email"
				placeholder="Email"
				name="email"
				defaultValue={
					state?.data?.email
						? (state?.data?.email as string)
						: initialUser.email
				}
				required
				errors={state?.errors?.fieldErrors.email}
			/>
			<Input
				iconHtml={<FaceSmileIcon />}
				type="text"
				placeholder="Bio"
				name="bio"
				defaultValue={
					state?.data?.bio
						? (state?.data?.bio as string)
						: initialUser.bio ?? ""
				}
				required={false}
				errors={state?.errors?.fieldErrors.bio}
			/>
			<div className="collapse collapse-arrow bg-base-100 border border-base-300">
				<input type="checkbox" name="my-accordion-1" defaultChecked />
				<div className="collapse-title font-semibold text-sm">
					Would you like to change your password?
				</div>
				<div className="collapse-content text-sm *:mb-4">
					<Input
						iconHtml={<KeyIcon />}
						type="password"
						placeholder="Current Password"
						name="current_password"
						required={false}
						minLength={PASSWORD_MIN_LENGTH}
						errors={state?.errors?.fieldErrors.current_password}
					/>
					<Input
						iconHtml={<KeyIcon />}
						type="password"
						placeholder="New Password"
						name="new_password"
						required={false}
						minLength={PASSWORD_MIN_LENGTH}
						errors={state?.errors?.fieldErrors.new_password}
					/>
					<Input
						iconHtml={<KeyIcon />}
						type="password"
						placeholder="Confirm Password"
						name="confirm_password"
						required={false}
						minLength={PASSWORD_MIN_LENGTH}
						errors={state?.errors?.fieldErrors.confirm_password}
					/>
				</div>
			</div>

			<Button text="Update Profile" />
		</form>
    );
}
