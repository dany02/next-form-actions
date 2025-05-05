"use client";
import { dislikeTweet, likeTweet } from "@/app/tweets/[id]/action";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";

interface LikeButton {
    likeCount: number;
    isLiked: boolean;
    tweetId: number;
}
export default function LikeButton({
    likeCount,
    isLiked,
    tweetId,
}: LikeButton) {
    const [state, reduceFn] = useOptimistic(
        { isLiked, likeCount },
        (previousState) => {
            return {
                isLiked: !previousState.isLiked,
                likeCount: previousState.isLiked
                    ? previousState.likeCount - 1
                    : previousState.likeCount + 1,
            };
        }
    );

    const onClick = async () => {
        reduceFn(undefined);
        if (isLiked) {
            await dislikeTweet(tweetId);
        } else {
            await likeTweet(tweetId);
        }
    };
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 flex items-center gap-2 border-[1px] border-neutral-400 rounded-full text-[13px]
	 hover:bg-neutral-200 transition-all`}
        >
            {state.isLiked ? (
                <HeartIcon className={`size-5 text-red-500`} />
            ) : (
                <OutlineHeartIcon className={`size-5 stroke-2 text-gray-500`} />
            )}
            좋아요 ({state.likeCount})
        </button>
    );
}
