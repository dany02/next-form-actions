"use client";
import { useEffect, useState } from "react";
import ListTweets from "./list-tweets";
import {
    getPaginatedTweets,
    getTweetsByPage,
    InitialProducts,
} from "@/service/tweetService";

interface TweetsListProps {
    initialTweets: InitialProducts;
}
export default function TweetsList({ initialTweets }: TweetsListProps) {
    const [tweets, setTweets] = useState(initialTweets);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    useEffect(() => {
        const fetchTweets = async () => {
			const { tweets, isLastPage } = await getPaginatedTweets(page);
			setTweets(tweets);
			setIsLastPage(isLastPage);
        };

        fetchTweets();
    }, [page]);

    return (
        <div className="py-5 flex flex-col min-h-screen gap-3">
            {tweets.map((tweet, index) => (
                <ListTweets key={index} {...tweet} />
            ))}
            <div className="flex justify-between items-center mt-8">
                <button
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded ${
                        page === 1
                            ? `bg-gray-200 text-white cursor-not-allowed`
                            : `bg-white cursor-pointer`
                    }`}
                    onClick={() => setPage((prev) => prev === 1 ? prev : prev - 1)}
                >
                    PREV
                </button>
                <button
                    onClick={() =>  setPage((prev) => isLastPage ? prev : prev + 1)}
                    disabled={isLastPage}
                    className={`px-4 py-2 border rounded ${
                        isLastPage
                            ? `bg-gray-200 text-white cursor-not-allowed`
                            : `bg-white cursor-pointer`
                    }`}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}
