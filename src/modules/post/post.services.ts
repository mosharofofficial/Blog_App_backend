


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


const getAllPostsService = async (search: string|undefined = undefined, tags: string[] = [], isFeatured: boolean | undefined = undefined) => {
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
            where: {AND: query}
        });
        
        
        return res;
    } catch (error) {
        throw new Error("Error fetching posts");
    }
}

export const postService = {
    createPostService,
    getAllPostsService
};

