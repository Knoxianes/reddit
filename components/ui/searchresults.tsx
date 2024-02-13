'use client';
import { fetchSearch } from "@/lib/data"
import { subreddits } from "@prisma/client";
import { useQuery } from "react-query"

export default function SerachResults({ query }: { query: string }) {

    const { isLoading, error, data } = useQuery<subreddits[]>(['subreddits', query], () => fetchSearch(query));

    if (isLoading) return <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl text-3xl">Loading...</div>
    if (error) return <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl text-3xl text-red-500">Error</div>
    return (
        <div className="bg-gray-900 w-[98.5%] h-full rounded-b-3xl">
            {data?.map((subreddit: subreddits) => (
                <div key={subreddit.title} className="bg-gray-600 w-full h-6">

                </div>
            ))
            }
        </div>
    )
}
