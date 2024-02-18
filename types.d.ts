import { posts } from "@prisma/client";


type feedPost =
    posts & {
        subreddits: {
            subredditid: string,
            title: string,
        } | null;
        votesSum: number | null
        commentCount: number | null
        userJoinedSubreddit: boolean | null
        vote: {
            value: number
            voteid: string
        } | null
    }

