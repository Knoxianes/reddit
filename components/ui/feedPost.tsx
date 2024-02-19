import { createPost, deletePost, updatePost } from "@/lib/actions";
import { feedPost } from "@/types"
import { Roboto } from "next/font/google"
import Link from "next/link";
import { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

type props = {
    post: feedPost,
    userID: string | null | undefined,
}

const font = Roboto({
    weight: "500",
    subsets: ["latin"]
})
const font2 = Roboto({
    weight: "300",
    subsets: ["latin"]
})
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default function FeedPost({ post, userID }: props) {
    const [upVoted, setUpVoted] = useState(post.vote?.value! > 0);
    const [downVoted, setDownVoted] = useState(post.vote?.value! < 0);
    const [voteSum, setVoteSum] = useState(post.votesSum ? post.votesSum : 0);
    const [updating, setUpdating] = useState(false);
    const [joinedSubreddit, setJoinedSubreddit] = useState(post.userJoinedSubreddit);


    const onClickUpVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userID) {
            location.href = "/sign-in";
            return
        }
        if (upVoted) {
            setUpdating(true);
            await deletePost(userID, post.postid).finally(() => setUpdating(false));
            setUpVoted(false);
            setVoteSum(voteSum - 1);
            return;
        }
        if (downVoted) {
            setUpdating(true);
            await updatePost(userID, post.postid, 1).finally(() => setUpdating(false));
            setUpVoted(true);
            setDownVoted(false);
            setVoteSum(voteSum + 2);
            return;
        }
        setUpdating(true);
        await createPost(userID, post.postid, 1).finally(() => setUpdating(false));
        setUpVoted(true);
        setVoteSum(voteSum + 1);

    }
    const onClickDownVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userID) {
            location.href = "/sign-in";
            return
        }
        if (downVoted) {
            setUpdating(true);
            await deletePost(userID, post.postid).finally(() => setUpdating(false));
            setDownVoted(false);
            setVoteSum(voteSum + 1);
            return;
        }
        if (upVoted) {
            setUpdating(true);
            await updatePost(userID, post.postid, -1).finally(() => setUpdating(false));
            setDownVoted(true);
            setUpVoted(false);
            setVoteSum(voteSum - 2);
            return;
        }
        setUpdating(true);
        await createPost(userID, post.postid, -1).finally(() => setUpdating(false));
        setDownVoted(true);
        setVoteSum(voteSum - 1);

    }

    const onClickJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!userID) {
            location.href = "/sign-in";
            return
        }



    }


    return (
        <Link href={`r/${post.subreddits?.title}/${post.postid}`} className="w-full py-8 px-4 max-h-[25rem] flex cursor-pointer ">
            <div className="w-3/4 flex flex-col gap-8 justify-around">
                <div className="flex gap-4 w-full">
                    <div className="w-10 h-10 text-lg bg-gray-700 rounded-full flex justify-center items-center">
                        AV
                    </div>
                    <div className="text-xl flex justify-center items-center" style={font.style}>
                        r/{post.subreddits?.title}
                    </div>
                    <div className="flex items-center justify-center text-lg opacity-60 font-bold">
                        {new Date(Number(post.date) * 1000).getDate()} - {months[new Date(Number(post?.date) * 1000).getMonth()]}
                    </div>
                </div>
                <div className="w-full pl-4 flex flex-col gap-4 text-4xl font-medium" >
                    {post.title &&
                        <div className={`${post.body ? font2.className : font.className}`}>

                            {post.title.length > 70 ? post.title.slice(0, 70) + "..." : post.title}
                        </div>
                    }
                    {post.body &&
                        <p className="w-full text-3xl text-justify">
                            {post.body?.length > 200 ? post.body.slice(0, 200) + "..." : post?.body}
                        </p>
                    }
                </div>
                <div className="flex flex-row gap-8">
                    <div className="bg-gray-700 rounded-full flex justify-center items-center w-32 px-3 py-1 gap-1 cursor-pointer">
                        {!updating &&
                            <>
                                <button className="z-10 " onClick={onClickUpVote}><MdKeyboardDoubleArrowUp className={`text-4xl transition ${upVoted ? "text-green-600 hover:text-gray-300" : "hover:text-green-600"}`} /></button>
                                <span className="text-2xl font-bold">{voteSum}</span>
                                <button className="z-10" onClick={onClickDownVote}><MdKeyboardDoubleArrowDown className={`text-4xl transition ${downVoted ? "text-red-600 hover:text-gray-300" : "hover:text-red-600"}`} /></button>
                            </>
                        }{
                            updating &&
                            <span className="loader h-8 w-8"></span>
                        }
                    </div>
                    <div className="bg-gray-700 rounded-full flex w-32 justify-center items-center px-3 py-3 gap-3 cursor-pointer transition hover:bg-opacity-60">
                        <FaRegCommentAlt className="text-3xl" />
                        <span className="text-2xl font-bold">{post.commentCount ? post.commentCount : 0}</span>
                    </div>
                </div>
            </div>
            <div className={`w-1/4 flex flex-col ${joinedSubreddit || !userID ? "justify-center" : ""} items-end gap-10`}>
                {!joinedSubreddit && userID &&
                    <button onClick className="rounded-full font-normal bg-green-800 w-fit text-2xl py-2 px-7 flex justify-center items-center cursor-pointer hover:bg-opacity-60" style={font.style}>
                        Join
                    </button>
                }
                {
                    post.img &&
                    <img alt="Image from post" src={post.img} className="max-h-[70%] max-w-[70%] rounded-2xl" />
                }
            </div>
        </Link >
    )
}
