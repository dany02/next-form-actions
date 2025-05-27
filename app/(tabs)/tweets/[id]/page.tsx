import LikeButton from "@/components/like-button";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import getSession from "@/lib/session";
import { formatCreateDate } from "@/lib/utils";
import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";
import Responses from "@/components/responses";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteTweet } from "./action";

export const metadata = {
	title: "Tweets Detail",
}

async function getIsOwner(userId:number){
	const session = await getSession();
	if(session.id){
		return session.id === userId;
	}
	return false;
}
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
						id:true,
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
        select: {
            id: true,
            text: true,
            created_at: true,
            user: {
                select: {
                    id: true,
                    username: true,
                },
            },
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
    params: Promise<{ id: string }>;
}) {
    const id = Number((await params).id);
    if (isNaN(id)) {
        return notFound();
    }
    const tweets = await getCachedTweet(id);
    if (!tweets) {
        return notFound();
    }

    const { likeCount, isLiked } = await getCachedLikeStatus(id);
    const responses = await getCachedResponses(id);
	const isOwner = await getIsOwner(tweets.user.id);

	const handleDelete = async () => {
		"use server";
		await deleteTweet(id);
	};

    return (
        <div className="w-full p-6">
            <div className="px-5">
				<div className="relative">
					{isOwner ? (
						<form action={handleDelete}>
							<button className="absolute right-0 top-[-5px] btn btn-outline btn-sm btn-secondary">Delete <TrashIcon className="size-5"/></button>
						</form>
					) : null}					
					<div className="mb-3">
						<span className="text-[16px] font-bold dark:text-white">
							{tweets.user.username}
						</span>
					</div>
					<p className="mb-3 text-gray-800 text-lg break-all dark:text-white">
						{tweets.tweet}
					</p>
					<div className="text-sm text-gray-600 mb-5">
						{formatCreateDate(tweets.created_at.toString())}
					</div>
				</div>
                {/* 좋아요 버튼 영역 */}
                <LikeButton
                    likeCount={likeCount}
                    isLiked={isLiked}
                    tweetId={id}
                />
                {/* 댓글 영역 */}
                <Responses
                    initialResponses={responses}
                    tweetId={tweets.id}
                    username={tweets.user.username}
                />
            </div>
        </div>
    );
}
