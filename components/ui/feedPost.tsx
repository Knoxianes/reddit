import { feedPost } from "@/types"
import { Roboto } from "next/font/google"
import { FaRegCommentAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

type props = {
    post: feedPost | null,
}

const font = Roboto({
    weight: "500",
    subsets: ["latin"]
})
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export default function FeedPost({ post }: props) {
    return (
        <div className="w-full py-8 px-4 max-h-80 flex ">
            <div className="w-3/4 flex flex-col gap-8 justify-around">
                <div className="flex gap-4">
                    <div className="w-10 h-10 text-lg bg-gray-700 rounded-full flex justify-center items-center">
                        AV
                    </div>
                    <div className="text-xl flex justify-center items-center" style={font.style}>
                        r/{post?.subreddits?.title}
                    </div>
                    <div className="flex items-center justify-center text-lg opacity-60 font-bold">
                        {new Date(Number(post?.date) * 1000).getDate()} - {months[new Date(Number(post?.date) * 1000).getMonth()]}
                    </div>
                </div>
                <div className="w-full pl-4 text-4xl max-h-full" style={font.style}>
                    {post?.title}
                </div>
                <div className="flex flex-row gap-8">
                    <div className="bg-gray-700 rounded-full flex justify-center items-center px-3 py-1 gap-1 cursor-pointer">
                        <MdKeyboardDoubleArrowUp className="text-4xl transition hover:text-green-500" />
                        <span className="text-2xl font-bold">{post?.votesValue ? post.votesValue : 0}</span>
                        <MdKeyboardDoubleArrowDown className="text-4xl transition hover:text-red-600" />
                    </div>
                    <div className="bg-gray-700 rounded-full flex justify-center items-center px-7 py-3 gap-3 cursor-pointer transition hover:bg-opacity-60">
                        <FaRegCommentAlt className="text-3xl" />
                        <span className="text-2xl font-bold">50</span>
                    </div>
                </div>
            </div>
            <div className="w-1/4 flex flex-col items-end gap-10 ">
                <div className="rounded-full font-normal bg-green-800 w-fit text-2xl py-2 px-7 flex justify-center items-center cursor-pointer hover:bg-opacity-60" style={font.style}>
                    Join
                </div>
                {
                    post?.img &&
                    <img alt="Image from post" src={post.img} className="max-h-[70%] max-w-[70%]" />
                }
            </div>
        </div>
    )
}
