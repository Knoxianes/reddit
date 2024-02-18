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
            userID: userid.userid
        }
    });
    redirect("/");
}

const randomArray = (length: number, max: number) =>
    Array(length).fill(0).map(() => Math.round(Math.random() * max))

export async function fetchPostsForHome(userID: string | null | undefined) {
    const count = await prisma.posts.count();
    const rowNumbers = randomArray(20, count);


    const postPromises = rowNumbers.map(async (number) => {
        const post = await prisma.posts.findFirst({
            skip: number,
            take: 1,
            include: {
                subreddits: {
                    select: {
                        title: true,
                        subredditid: true,
                        userids: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            }


        });

        const votesSum = await prisma.votes.aggregate({
            where: {
                postid: {
                    equals: post?.postid
                },
            },
            _sum: {
                value: true
            }

        });
        let vote = null;
        let joinedSubreddit = null;
        if (userID) {
            vote = await prisma.votes.findFirst({
                where: {
                    postid: {
                        equals: post?.postid
                        
                    },
                    userid: {
                        equals: userID,
                    }
                },
                select: {
                    value: true,
                    voteid: true,
                }
            });
            joinedSubreddit = post?.subreddits?.userids?.includes(userID);
        }

        const ret = { ...post, votesSum: votesSum._sum.value, vote: vote, commentCount: post?._count?.comments, userJoinedSubreddit: joinedSubreddit }
        return ret
    })
    const posts = await Promise.all(postPromises) as feedPost[];
    return posts
}

export async function updatePost(userID: string, postID: string, value: number) {
    await prisma.votes.updateMany({
        where: {
            userid: userID,
            postid: postID
        },
        data: {
            value: value
        }
    });
}
export async function deletePost(userID: string, postID: string) {
    await prisma.votes.updateMany({
        where: {
            userid: userID,
            postid: postID
        },
        data: {
            value: 0
        }
    }).then(() => console.log("updated"));

}
export async function createPost(userID: string, postID: string, value: number) {
    const vote = await prisma.votes.findFirst({
        where: {
            userid: userID,
            postid: postID
        },
        select: {
            voteid: true
        },

    });
    if (vote) {
        await updatePost(userID, postID, value);

    } else {
        await prisma.votes.create({
            data: {
                userid: userID,
                postid: postID,
                value: value
            }
        })
    };
}
