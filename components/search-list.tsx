import { getSearchResult, InitialSearchs } from "@/service/searchService";
import { useEffect, useState } from "react";
import ListTweets from "./list-tweets";

interface SearchListProps {
    term: string;
}
export default function SearchList({ term }: SearchListProps) {
    const [searchQuery, setSearchQuery] = useState<InitialSearchs>([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultTweets = await getSearchResult(term);
            setSearchQuery(resultTweets);
        };

        fetchData();
    }, [term]);

    return (
        <div className="mt-8">
			<ul>
				{searchQuery.map((tweet, index) => (
					<ListTweets key={index} {...tweet} />
				))}
			</ul>
        </div>
    );
}
