import { subreddits } from "@prisma/client";
import  Link  from "next/link";

export default function SearchResult({subreddit}:{subreddit:subreddits}){
    return(
        <Link href={`/r/${subreddit.title}`} className="flex flex-row justify-start items-center px-5 gap-6 h-24 overflow-hidden border-gray-500 transiton hover:bg-gray-700 rounded-3xl">
            <div className="bg-gray-500 rounded-full w-16 h-16 text-xl flex items-center justify-center">
                CM
            </div>
            <div className="flex flex-col items-start justify-center">
                <div className="text-2xl">
                    r/{subreddit.title}
                </div>
                <div className="text-xl">
                    {subreddit.userids.length} members
                </div>
            </div>
        </Link>
    )
}
