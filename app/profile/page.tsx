import db from "@/lib/db";
import getSession from "@/lib/session";
import { FireIcon } from "@heroicons/react/16/solid";
import { notFound, redirect } from "next/navigation";

async function getUser(){
	const session = await getSession();
	if(session.id){
		const user = await db.user.findUnique({
			where: {
				id: session.id
			},
			select: {
				id: true,
				username: true,
				email: true,
			}
		});
		if(user){
			return user;
		}
	}
	notFound();
}

export default async function Profile() {
	const user = await getUser();
	const logOut = async () => {
		"use server";
		const session = await getSession();
		await session.destroy();
		redirect("/");
	};



    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <FireIcon className="size-16 text-red-400 mx-auto mb-8" />
                <h2 className="text-center mb-10">Welcome to Dana's world!</h2>
				<h2 className="text-center mb-10">Profile</h2>
				<p className="text-center mb-10">Hi 👋, {user?.username}🌼</p>
				<p className="text-center mb-10">Email: {user?.email}</p>
				<form action={logOut}>
					<button className="basic-btn">Log Out</button>
				</form>		

            </div>
        </div>
    );
}
