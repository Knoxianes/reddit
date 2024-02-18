"use client";

import { useEffect, useState } from "react";
import { feedPost } from "@/types";
import { useInView } from 'react-intersection-observer';
import { fetchPostsForHome } from "@/lib/actions";
import FeedPost from "./feedPost";


type props = {
    className?: string,
    initialPosts: (feedPost | null)[],
    userID: string
}


export default function InfiniteScroll({ className, initialPosts, userID }: props) {
    const [ref, inView] = useInView();
    const [posts, setPosts] = useState(initialPosts);

    async function loadMorePosts() {
        const newPosts = await fetchPostsForHome(userID);
        if (newPosts) {
            setPosts([...posts, ...newPosts]);
        }
    }

    useEffect(() => {
        if (inView) {
            loadMorePosts();
        }
    }, [inView])
    return (
        <div className={className}>
            {
                posts?.map((post: feedPost | null, index: number) => post &&
                    <div key={post ? post.postid + index : "post" + index} 
                        className=" rounded-3xl transition  hover:bg-gray-800" >
                        <FeedPost userID={userID} post={post} />
                        <hr className="border-gray-700" />
                    </div>
                )
            }
            {posts &&
                <div className="flex justify-center items-center py-10">
                    <span ref={ref} className="loader w-20 h-20"></span>
                </div>
            }
        </div>
    )
}
