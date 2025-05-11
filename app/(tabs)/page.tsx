import TweetsList from "@/components/tweets-list";
import { getInitialTweets } from "@/service/tweetService";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
    title: "TWEETS",
};

export default async function Home() {
    const initialTweets = await getInitialTweets();

    return (
        <div className="pt-3 px-5 w-full h-screen">
            {initialTweets.length === 0 ? (
                <div className="pt-30 text-center">
                    <p className="mb-5 dark:text-white">
                        No tweets here yet. Ready to write your first one?
                    </p>
                    <Link
                        href={"/tweets/add"}
                        className={`btn btn-dash btn-success`}
                    >
                        <PuzzlePieceIcon className="size-5" />
						Create Tweet!
                    </Link>
                </div>
            ) : (
                <TweetsList initialTweets={initialTweets} />
            )}
        </div>
    );
}
