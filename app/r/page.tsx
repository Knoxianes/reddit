import InfiniteScroll from "@/components/ui/infinitescroll";
import { fetchPostsForHome } from "@/lib/actions";
import { currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";


export default async function Page({ searchParams }: { searchParams?: { feed?: string } }) {

  const feed = searchParams?.feed || "home";
  if (feed.toLowerCase() != "home" && feed.toLowerCase() != "explore") notFound();

  const user = await currentUser();

  const posts = await fetchPostsForHome("da2003db-1f14-4b06-9bd8-2c8a85d84c5e");

  return (
    <div className="grid grid-cols-12 justify-center items-center w-full pt-4">
      <InfiniteScroll
        initialPosts={posts}
        userID={user?.privateMetadata?.userID as string}
        className="w-full col-start-3 col-end-11" />
    </div>
  )
}
