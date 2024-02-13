import { subreddits } from "@prisma/client";


export async function fetchSearch(query: string): Promise<subreddits[]> {
    const response = await fetch("/api/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: query
        })
    })
    const data = await response.json();
    const ret: subreddits[] = JSON.parse(data);
    return ret;
}
