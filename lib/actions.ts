'use server';
import { redirect } from "next/navigation";
import prisma from "@/db/db";



export async function registerUser(formData: FormData) {
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
    await prisma.users.create({
        data: {
            username: username,
            email: email
        }
    })
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
