import { fetchPost } from "@/lib/data";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { title: string, postID: string } }) {
    const subreddit = params.title;
    if (params.postID.length != 12) notFound();

    const post = await fetchPost(params.postID);
    if (!post) notFound();
    return (
        <div>
            /r{subreddit}{post?.postid}
        </div>
    );
}
