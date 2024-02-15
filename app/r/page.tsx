import InfiniteScroll from "@/components/ui/infinitescroll";
import { fetchSubredditsForHome } from "@/lib/actions";
import { notFound } from "next/navigation";


export default async function Page({ searchParams }: { searchParams?: { feed?: string } }) {
  const feed = searchParams?.feed || "home";
  if (feed.toLowerCase() != "home" && feed.toLowerCase() != "explore") notFound();
  const posts = await fetchSubredditsForHome();
  return (
    <div className="grid grid-cols-12 justify-center items-center w-full pt-4">
      <InfiniteScroll 
        initialPosts={posts}
        className="w-full col-start-3 col-end-11" />     
    </div>
  )
}
