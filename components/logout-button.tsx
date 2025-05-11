"use client";

import { logOut } from "@/app/(tabs)/users/[username]/action";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export default function LogoutButton() {
	const {setTheme} = useTheme();
	const handleLogout = async () => {
        setTheme("light");
		await logOut();
    };
    return (
        <form action={handleLogout}>
            <button className="btn btn-error">
                logout <ArrowRightStartOnRectangleIcon className="size-5" />
            </button>
        </form>
    );
}
