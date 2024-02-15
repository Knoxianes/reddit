'use server';
import { redirect } from "next/navigation";
import prisma from "@/db/db";
import { feedPost } from "@/types";
import { clerkClient } from "@clerk/nextjs";



export async function registerUser(clerkID: string, formData: FormData) {
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    if (!username || !email) {
        throw new Error();
    }
    const userID = await prisma.users.findFirst({
        where: { email: email }
    });

    if (userID) {
        throw new Error();
    }
    const userid = await prisma.users.create({
        data: {
            username: username,
            email: email
        },
        select: {
            userid: true
        }
    })
    await clerkClient.users.updateUserMetadata(clerkID, {
        privateMetadata: {
            userID: userid
        }
    });
    redirect("/");
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



const randomArray = (length: number, max: number) =>
    Array(length).fill(0).map(() => Math.round(Math.random() * max))

export async function fetchPostsForHome(userID?: string) {
    const count = await prisma.posts.count();
    const rowNumbers = randomArray(10, count);

    const postPromises = rowNumbers.map(async (number) => {
        const post = await prisma.posts.findFirst({
            skip: number,
            take: 1,
            include: {
                subreddits: {
                    select: {
                        title: true,
                        subredditid: true,
                    }
                },
            },

        });
        const voteValue = await prisma.votes.aggregate({
            where: {
                postid: {
                    equals: post?.postid
                },
            },
            _sum: {
                value: true
            }

        });


        const ret = { ...post, votesValue: voteValue._sum.value }
        return ret
    })
    return await Promise.all(postPromises) as feedPost[];
}
