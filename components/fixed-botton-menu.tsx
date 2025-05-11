"use client";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon as OutlineUserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserName } from "@/service/userService";

export default function FixedBottomMenu() {
    const pathName = usePathname();
    const isActive = (href: string) => pathName === href;
    const [username, setUsername] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserName();
            setUsername(user?.username);
        };
        fetchData();
    }, []);
    return (
			<div className="dock dock-xl max-w-screen-md mx-auto dark:text-white">
				{/* Home */}
				<Link
					href={"/"}
					className={`${isActive("/") ? "dock-active" : null}`}
				>
					<svg
						className="size-[1.6em]"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<g
							fill="currentColor"
							strokeLinejoin="miter"
							strokeLinecap="butt"
						>
							<polyline
								points="1 11 12 2 23 11"
								fill="none"
								stroke="currentColor"
								strokeMiterlimit="10"
								strokeWidth="2"
							></polyline>
							<path
								d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
								fill="none"
								stroke="currentColor"
								strokeLinecap="square"
								strokeMiterlimit="10"
								strokeWidth="2"
							></path>
							<line
								x1="12"
								y1="22"
								x2="12"
								y2="18"
								fill="none"
								stroke="currentColor"
								strokeLinecap="square"
								strokeMiterlimit="10"
								strokeWidth="2"
							></line>
						</g>
					</svg>
				</Link>
				{/* Tweet Create */}
				<Link
					href={"/tweets/add"}
					className={`${isActive("/tweets/add") ? "dock-active" : null}`}
				>
					<span className="flex justify-center items-center size-[1.5em] border-2 rounded-sm border-black dark:border-white">
						<PlusIcon className="size-[1em] stroke-2" />
					</span>
				</Link>
				{/* Search */}
				<Link
					href={"/search"}
					className={`${isActive("/search") ? "dock-active" : null}`}
				>
					<MagnifyingGlassIcon className="size-[1.7em] stroke-2" />
				</Link>
				{/* user */}
				<Link
					href={`/users/${username}`}
					className={`${
						isActive(`/users/${username}`) ? "dock-active" : null
					}`}
				>
					<OutlineUserCircleIcon className="size-[2em] block dark:hidden" />
					<UserCircleIcon className="size-[2em] hidden dark:block" />
				</Link>
			</div>
    );
}
