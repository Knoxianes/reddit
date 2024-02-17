import { posts } from "@prisma/client";


type feedPost = {
    subreddits: {
        subredditid: string,
        title: string,
    } | null;
} & posts & {
    votesSum: number | null
    voteValue: number | null
    commentCount: number | null
}

