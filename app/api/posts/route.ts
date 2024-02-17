import { fetchPostsForHome } from "@/lib/data";


export async function GET() {
    return Response.json(JSON.stringify(await fetchPostsForHome()));
}
