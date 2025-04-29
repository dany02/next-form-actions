import db from "@/lib/db";
import { formatCreateDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getTweets(id: number) {
    const tweets = await db.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    username: true,
                },
            },
        },
    });
    return tweets;
}

export default async function TweetsDetail({
    params,
}: {
    params: { id: string };
}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const tweets = await getTweets(id);
    if (!tweets) {
        return notFound();
    }

    return (
        <div className="w-d min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-40">
                <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">
                            Tweet Detail
                        </h1>
                        <Link
                            href="/"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            ← 홈으로
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <p className="text-gray-800 text-lg">{tweets.tweet}</p>

                        <div className="text-sm text-gray-500">
                            작성자:{" "}
                            <span className="font-medium">
                                {tweets.user.username}
                            </span>
                        </div>

                        <div className="text-sm text-gray-400">
                            작성일:{" "}
                            {formatCreateDate(tweets.created_at.toString())}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
