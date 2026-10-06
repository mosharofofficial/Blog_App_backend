


// model Post {
//   id            String     @id @default(uuid())
//   title         String     @db.VarChar(255)
//   content       String?    @db.Text
//   thumbnail_url String?
//   isFeatured    Boolean    @default(false)
//   status        PostStatus @default(PUBLISHED)
//   tags          String[]
//   views         Int        @default(0)
//   authorId      String
//   createdAt     DateTime   @default(now())
//   updatedAt     DateTime   @updatedAt
//   comments      Comment[]

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

export const postService = {
    createPostService,
    getAllPostsService,
    getPostByIdService
};


