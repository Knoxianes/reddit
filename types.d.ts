import { posts } from "@prisma/client";


type feedPost = {
    subreddits: {
        subredditid: string,
        title: string,
    } | null;
} & posts & {
    votesValue: number | null
}
