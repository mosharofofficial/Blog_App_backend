import { prisma } from "../../lib/prisma"



const getStatsService = async ()=>{
    return await prisma.$transaction(async (tx)=>{
        const [totalPosts, publishedPosts, draftPosts, archivedPosts, totalComments, approvedComments] = await Promise.all([
            await tx.post.count(),
            await tx.post.count({where: {status: "PUBLISHED"}}),
            await tx.post.count({where: {status: "DRAFT"}}),
            await tx.post.count({where: {status: "ARCHIVED"}}),
            await tx.comment.count(),
            await tx.comment.count({where: {status: "APPROVED"}})
        ])
        return {totalPosts, publishedPosts, draftPosts, archivedPosts, totalComments, approvedComments}
    })
}

export const statsService = {
    getStatsService
}