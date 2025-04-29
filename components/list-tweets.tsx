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
		<div className="w-full h-28 bg-white rounded-2xl">
			<Link href={`/tweets/${id}`} className="h-full px-5 py-3 flex flex-col justify-center gap-1">
				<div className="text-base">작성자: <span className="font-bold">{user.username}</span></div>
				<p>{tweet}</p>
				<div className="text-sm">{formatCreateDate(created_at.toString())}</div>
			</Link>
		</div>
	);
}
