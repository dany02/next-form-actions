import ListTweets from "@/components/list-tweets";
import LogoutButton from "@/components/logout-button";
import { getCurrentUser, getUserProfile } from "@/service/profileServise";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Profile",
}

export default async function Users({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const userExist = await getCurrentUser((await params).username);

    if (!userExist) {
        return notFound();
    }
    const user = await getUserProfile((await params).username);

    return (
        <div className="pt-8 pb-5 px-5 w-full">
            <div className="flex flex-row items-center gap-2">
                <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-15 inset-ring-3 inset-ring-[rgba(0,211,144,1)] shadow-[-1px_-2px_15px_3px_rgba(0,211,144,0.8)] rounded-full">
                        <span className="font-bold text-[16px] uppercase">
                            {user?.username.charAt(0)}
                        </span>
                    </div>
                </div>
                <div className="flex-1 pl-5">
                    <div className="text-[18px] font-semibold mb-1 dark:text-white">
                        {user?.email}
                    </div>
                    <div className="dark:text-white">{user?.bio || ""}</div>
                </div>
                
                <Link
                    href={`/users/${(await params).username}/edit`}
                    className="btn btn-success"
                >
                    Edit
                </Link>
				<LogoutButton/>
            </div>
            <div className="divider"></div>
            <div>
                {user?.tweets.map((tweet, index) => (
                    <ListTweets
                        key={index}
                        id={tweet.id}
                        user={user}
                        tweet={tweet.tweet}
                        created_at={tweet.created_at}
                    />
                ))}
            </div>
        </div>
    );
}
