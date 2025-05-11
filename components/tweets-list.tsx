"use client";
import { useEffect, useState } from "react";
import ListTweets from "./list-tweets";
import { getPaginatedTweets, InitialProducts } from "@/service/tweetService";

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
        <div className="py-5 flex flex-col gap-3">
            <ul>
                {tweets.map((tweet, index) => (
                    <ListTweets key={index} {...tweet} />
                ))}
            </ul>
            <div className="join w-70 mx-auto grid grid-cols-2">
                <button
                    onClick={() =>
                        setPage((prev) => (prev === 1 ? prev : prev - 1))
                    }
                    disabled={page === 1}
                    className="join-item btn btn-outlin"
                >
                    Previous page
                </button>
                <button
                    onClick={() =>
                        setPage((prev) => (isLastPage ? prev : prev + 1))
                    }
                    disabled={isLastPage}
                    className="join-item btn btn-outlin"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
