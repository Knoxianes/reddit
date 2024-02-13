'use client';
import { fetchSearch } from "@/lib/data"
import { subreddits } from "@prisma/client";
import { useQuery } from "react-query"
import SearchResult from "./searchresult";

export default function SerachResults({ query }: { query: string }) {

    const { isLoading, error, data } = useQuery<subreddits[]>(['subreddits', query], () => fetchSearch(query));

    if (isLoading) return <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl text-3xl">Loading...</div>
    if (error) return <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl text-3xl text-red-500">Error</div>
    return (
        <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl flex flex-col justify-center items-start gap-2 pt-4">
                {data?.map((subreddit: subreddits, index) => (
                    <div key={subreddit.title} className={`w-full ${index != data.length-1 ? "border-b" : ""} border-gray-500 py-2 `}>
                        <SearchResult subreddit={subreddit} />
                    </div>
                ))
                }
            <div className="text-2xl p-3 border-t-2 border-t-gray-600 w-full">
                Search for &quot;{query}&quot;
            </div>
        </div>
    )
}
