



import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";



const createPostService = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>)=>{

    try {
        const res = await prisma.post.create({
        data: data
    })
    return res;
    } catch (error) {
        throw new Error("Error creating post");
    }
}


const getAllPostsService = async (search: string|undefined = undefined, tags: string[] = [], isFeatured: boolean | undefined = undefined, page: number, limit: number, sortBy: string | undefined, sortOrder: string | undefined) => {
    
    const query: any = [];
    const searchQuery : any = {OR: [
                    { title: { contains: search as string, mode: 'insensitive' } },
                    { content: { contains: search as string, mode:'insensitive'} },
                    {tags: { has: search as string }}
                ]};

    const tagsQuery : any = { tags: {hasEvery: tags} };

    if (search) {
        query.push(searchQuery);
    }

    if (tags.length > 0) {
        query.push(tagsQuery);
    }

    if (typeof isFeatured === 'boolean') {
        query.push({ isFeatured: isFeatured });
    }

    try {
        
        const res = await prisma.post.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: {AND: query},
            orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
            include: {
                _count: {select: {comments: true}}
            }
            

        });
        
        
        return res;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching posts");
    }
}


const getPostByIdService = async (id: string) => {
    return await prisma.$transaction(async (tx)=>{
        await tx.post.update({
            where: {id: id},
            data: {views: {increment: 1}}
        })
        return await tx.post.findUnique({
            where: {id: id},
            include: {
                comments: {
                    where: {parentId: null, status: "APPROVED"},
                    orderBy: {createdAt: 'desc'},
                    include: {
                        replies: {
                            where: {status: "APPROVED"},
                            include: {
                                replies: {
                                    where: {status: "APPROVED"},
                                }
                            }
                        }
                    }
                },
                _count: {select: {comments: true}}

            }
        })
    })
}

const getUserOwnedPostsService = async (authorId: string, page: number, limit: number) => {
    try {
        const posts = await prisma.post.findMany({
            where: { authorId },
            take: limit,
            skip: (page - 1) * limit,
            orderBy: {createdAt: "desc"},
            include: {
                _count: {select: {comments: true}}
            }
        });
        return posts;
    } catch (error) {
        throw new Error("Error fetching user's posts");
    }
}

const updateOwnedPostService = async (postId: string, authorId: string, data: Partial<Post>, isAdmin: boolean) => {
    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: { id: postId }
        });
        if (!isAdmin && post.authorId !== authorId) {
            throw new Error("Post not found or not owned by user");
        }
        if (!isAdmin) {
            delete data.isFeatured;
        }
        return await prisma.post.update({
            where: { id: postId },
            data
        });
    } catch (error) {
        throw new Error("Error updating post");
    }
}

const deleteOwnedPostService = async (postId: string, authorId: string, isAdmin: boolean) => {
     try {
        const post = await prisma.post.findUniqueOrThrow({
            where: { id: postId }
        });
        if (!isAdmin && post.authorId !== authorId) {
            throw new Error("Post not found or not owned by user");
        }
        return await prisma.post.delete({
            where: { id: postId }
        });
    } catch (error) {
        throw new Error("Error updating post");
    }
}

export const postService = {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    getUserOwnedPostsService,
    updateOwnedPostService,
    deleteOwnedPostService
};


