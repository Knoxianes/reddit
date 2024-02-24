import { fetchSubreddit } from "@/lib/data";
import { notFound } from "next/navigation";


export default async function Page({ params }: { params: { title: string } }) {
  const title = params.title;
  const subreddit = await fetchSubreddit(title);
  if (!subreddit) notFound();
  return (
    <div className="w-full flex flex-row ">
      <div>
      </div>
    </div>
    
  )
}
