import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";
import getSession from "@/lib/session";
import { formatCreateDate } from "@/lib/utils";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import Responses from "@/components/responses";

async function getTweets(tweetId: number) {
    try {
        const tweet = await db.tweet.findUnique({
            where: {
                id: tweetId,
            },
            include: {
                user: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return tweet;
    } catch (e) {
        return null;
    }
}

async function getCachedTweet(tweetId: number) {
    const cachedOperation = nextCache(getTweets, ["tweet-detail"], {
        tags: [`tweet-detail-${tweetId}`],
        revalidate: 60,
    });
    return cachedOperation(tweetId);
}

async function getLikeStatus(tweetId: number, userId: number) {
    const isLiked = await db.like.findUnique({
        where: {
            id: {
                tweetId,
                userId,
            },
        },
    });

    const likeCount = await db.like.count({
        where: {
            tweetId,
        },
    });

    return {
        likeCount,
        isLiked: Boolean(isLiked),
    };
}

async function getCachedLikeStatus(tweetId: number) {
    const session = await getSession();
    const userId = session.id!;
    const cachedOperation = nextCache(getLikeStatus, ["tweet-like-status"], {
        tags: [`tweet-like-${tweetId}`],
    });
    return cachedOperation(tweetId, userId);
}

async function getResponses(tweetId: number) {
    const responses = await db.response.findMany({
        where: {
            tweetId,
        },
		select:{
			id:true,
			text: true,
			created_at: true,
			user: {
				select: {
					id:true,
					username:true,
				}
			}
		},
    });
    return responses;
}
async function getCachedResponses(tweetId: number) {
    const cachedOperation = nextCache(getResponses, ["tweet-responses"], {
        tags: [`tweet-responses-${tweetId}`],
    });
	return cachedOperation(tweetId);
}

export type InitialResponses = Prisma.PromiseReturnType<typeof getResponses>;

export default async function TweetsDetail({
    params,
}: {
    params: { id: string }
}) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return notFound();
    }
    const tweets = await getCachedTweet(id);
    if (!tweets) {
        return notFound();
    }

    const { likeCount, isLiked } = await getCachedLikeStatus(id);
	const responses = await getCachedResponses(id);

    return (
        <div className="min-h-screen flex justify-center">
            <div className="w-md min-h-screen pt-5">
                <div className="max-w-2xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            href="/"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            ← 홈으로
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <div className="text-sm text-gray-500">
                            작성자:
                            <span className="font-medium">
                                {tweets.user.username}
                            </span>
                        </div>
                        <p className="text-gray-800 text-lg">{tweets.tweet}</p>
                        <div className="text-sm text-gray-600">
                            작성일:{" "}
                            {formatCreateDate(tweets.created_at.toString())}
                        </div>
						{/* 좋아요 버튼 영역 */}
                        <LikeButton
                            likeCount={likeCount}
                            isLiked={isLiked}
                            tweetId={id}
                        />
						{/* 댓글 영역 */}
						<Responses  initialResponses={responses} tweetId={tweets.id} username={tweets.user.username}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
