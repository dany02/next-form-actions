import TweetsList from "@/components/tweets-list";
import { PlusIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { getInitialTweets } from "@/service/tweetService";

export default async function Home() {
    const initialTweets = await getInitialTweets();

    return (
        <div className="pt-3 px-5 w-full min-h-screen">
            <div className="flex justify-end">
                <Link href={"/tweets/add"} className="self-end">
                    <PlusIcon className="size-10" />
                </Link>
            </div>
            <div className="">
                <TweetsList initialTweets={initialTweets} />
            </div>
        </div>
    );
}
