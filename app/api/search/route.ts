import { PrismaClient } from "@prisma/client";
import { unstable_noStore } from "next/cache";

const prisma = new PrismaClient();
export async function POST(request: Request) {
    unstable_noStore();

    try {
        const { query } = await request.json();
        const subreddits = await prisma.subreddits.findMany({
            where: {
                title: {
                    contains: query,
                    mode: 'insensitive', // Case-insensitive search
                },
            },
            take: 5, // Limiting to 5 results
        });
        
        return Response.json(JSON.stringify(subreddits));
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch search.');
    }
}
