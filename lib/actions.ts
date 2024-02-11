'use server';
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();


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
    if (user){
        return true
    }else{
        return false
    }
}
