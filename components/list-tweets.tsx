import { formatCreateDate } from "@/lib/utils";
import Link from "next/link";

interface TweetsListProps {
    id: number;
    user: {
        username: string;
    };
    tweet: string;
    created_at: Date;
}
export default function ListTweets({
    id,
    user,
    tweet,
    created_at,
}: TweetsListProps) {
    return (
        <li className="list mb-5">
            <Link href={`/tweets/${id}`} className="dark:text-white items-center list-row bg-base-100 rounded-box shadow-xl border-[1px] border-neutral-200 dark:border-[#282e36]">
                <div>
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                            <span className="font-bold text-[16px] uppercase">{user.username.charAt(0)}</span> 
                        </div>
                    </div>
                </div>
                <div className="list-col-grow">
                    <div className="text-[15px] mb-1 font-bold dark:text-white">{user.username}</div>
                    <div className="text-sm font-medium font-noto-kr mb-1 text-neutral-600 dark:text-white">
                        {tweet.length > 20 ? tweet.slice(0, 20) + "..." : tweet}
                    </div>
                    <div className="text-xs text-neutral-600">
                        {formatCreateDate(created_at.toString())}
                    </div>
                </div>
            </Link>
        </li>
    );
}
