import { prisma } from "../../lib/prisma";


interface ICommentData {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string;
}


const createCommentService = async (data: ICommentData) => {
    await prisma.post.findFirstOrThrow({
        where: {
            id: data.postId
        }
    })

    await prisma.user.findFirstOrThrow({
        where: {
            id: data.authorId
        }
    })

    return await prisma.comment.create({
        data
    })
};

const getCommentByIdService = async (id: string) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: id,
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }
        
    })
    return comment;
}

const getCommentsByAuthorIdService = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId: authorId,
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            },
            replies: {
                select: {
                    id: true,
                    content: true,
                }
            }
        }
    });
    return comments;
}

const updateCommentService = async (id: string, data: Partial<ICommentData>) => {
    const updatedComment = await prisma.comment.update({
        where: {
            id
        }, 
        data
    })
}

const deleteCommentService = async (id: string) => {
    const deletedComment = await prisma.comment.delete({
        where: {
            id
        }
    })
}

const commentStatusUpdateService = async (id: string, status: "APPROVED" | "REJECTED") => {
    const comment = await prisma.comment.findUniqueOrThrow({
        where: {id},
        
    })

    if (comment.status === status) {
        return comment;
    }
    
    return await prisma.comment.update({
        where: {
            id
        },
        data: {
            status
        }
    })
    
}

export const commentService = {
    createCommentService,
    getCommentByIdService,
    getCommentsByAuthorIdService,
    updateCommentService,
    deleteCommentService,
    commentStatusUpdateService
};