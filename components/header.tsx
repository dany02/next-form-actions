"use client";
import { usePathname } from "next/navigation";
import ThemeButton from "./theme-button";

export default function Header() {
    const pathName = usePathname();
	let usernameFromPath;
	if(pathName.includes("/users/")){
		const segments = pathName.split("/");
		usernameFromPath = segments[2];
	}

	return (
		<header className="relative h-16">
			<h1 className="absolute left-0 top-0 w-full leading-[64px] text-center font-extrabold text-[25px] dark:text-white">
				{pathName === "/" && "TWEETS"}
				{pathName === "/tweets/add" && "Create Tweet"}
				{pathName === "/search" && "Tweets Search"}
				{pathName.includes("/users/") && !pathName.endsWith("/edit") && `${usernameFromPath}`}
				{pathName.includes("/edit") && "Edit Profile"}
			</h1>
			<div className="absolute right-5 top-0 h-full flex flex-row items-center gap-2">
				<ThemeButton />
			</div>
		</header>
	);
}

