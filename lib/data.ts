import { subreddits } from "@prisma/client";
import prisma from "@/db/db";
import { feedPost } from "@/types";
export const dynamic = 'force-dynamic'


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

export async function isRegistered(email: string) {
    const user = await prisma.users.findFirst({
        where: { email: email }
    })
    if (user) {
        return true
    } else {
        return false
    }
}

export async function fetchSubreddit(title: string) {
    try {
        const subreddit = await prisma.subreddits.findFirst({
            where: { title: title }
        });
        return subreddit
    } catch (error) {
        console.log("Database error: ", error);
        throw new Error();
    }
}

