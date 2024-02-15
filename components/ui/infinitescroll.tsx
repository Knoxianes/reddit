"use client";

import { useState } from "react";
import FeedPost from "./feedPost";
import { feedPost } from "@/types";


type props = {
    className?: string,
    initialPosts: (feedPost | null)[],
}

export default function InfiniteScroll({ className, initialPosts }: props) {
    const [posts, setPosts] = useState(initialPosts);
    return (
        <div className={className}>
            {
                posts?.map((post: feedPost | null, index: number) =>
                    <div key={post ? post.postid + index : index} className=" rounded-3xl transition  hover:bg-gray-800" >
                        <FeedPost post={post} />
                        <hr className="border-gray-700"/>
                    </div>
                )
            }
        </div>
    )
}
