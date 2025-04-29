"use client";
import { InitialProducts } from "@/app/page";
import { useEffect, useState } from "react";
import ListTweets from "./list-tweets";
import { getMoreTweets } from "@/app/action";

interface TweetsListProps {
    initialTweets: InitialProducts;
}
export default function TweetsList({ initialTweets }: TweetsListProps) {
	const take = 5;
    const [tweets, setTweets] = useState(initialTweets);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLastPage, setIsLastPage] = useState(false);

    const prevClick = () => {
		console.log(page);
        if (page !== 0 && !isLoading) {
            setPage((prev) => prev - 1);
        }
    };

    const nextClick = () => {
		if (!isLastPage && !isLoading) {
			setPage((prev) => prev + 1);
		  }
    };

    useEffect(() => {
		const fetchTweets = async () => {
			setIsLoading(true);

			if (page === 0) {
				setTweets(initialTweets.slice(0, 5));
				setIsLastPage(false);
			  } else {
				const newTweets = await getMoreTweets(page, take);
				const isLast = newTweets.length <= 5;
				setTweets(newTweets.slice(0, 5));
				setIsLastPage(isLast);
			  }
		
			setIsLoading(false);
		  };
		

		fetchTweets();
    }, [page]);

    return (
        <div className="p-3 flex flex-col w-md min-h-screen gap-3">
            {tweets.map((tweet, index) => (
                <ListTweets key={index} {...tweet} />
            ))}
            <div className="flex justify-between items-center mt-8">
                <button
					disabled={page === 0}
                    className={`px-4 py-2 border rounded ${page === 0 ? `bg-gray-200 text-white cursor-not-allowed` : `bg-white cursor-pointer`}`}
                    onClick={prevClick}
                >
                    PREV
                </button>
                <button
                    onClick={nextClick}
					disabled={isLastPage}
                    className={`px-4 py-2 border rounded ${isLastPage ? `bg-gray-200 text-white cursor-not-allowed` : `bg-white cursor-pointer`}`}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
}
