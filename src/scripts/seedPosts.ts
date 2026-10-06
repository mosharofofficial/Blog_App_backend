import { create } from "node:domain";
import { prisma } from "../lib/prisma";
import { postService } from "../modules/post/post.services";

const posts = [
  {
    title: "Mastering Next.js Caching",
    content: "In this guide, we dive deep into how caching works in Next.js, exploring Request Memoization, Data Cache, Full Route Cache, and Router Cache to optimize web performance.",
    thumbnail_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    tags: ["nextjs", "webdev", "react"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Understanding TypeScript Generics",
    content: "Generics allow you to create reusable code components that work with a variety of types. Learn how to write flexible, type-safe functions and interfaces.",
    thumbnail_url: "https://images.unsplash.com/photo-1516116211223-48a122638f5e?w=800",
    tags: ["typescript", "javascript", "coding"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "A Guide to Modern CSS Grid and Flexbox",
    content: "Combine CSS Grid and Flexbox to build complex, responsive web layouts with ease. We look at real-world examples and common design patterns.",
    thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
    tags: ["css", "frontend", "design"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Building Scalable REST APIs with Node.js and Express",
    content: "Learn how to structure your Express application for growth, implement proper error handling, middleware, and connect seamlessly to a relational database.",
    thumbnail_url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    tags: ["nodejs", "backend", "express"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Introduction to PostgreSQL Performance Tuning",
    content: "Slow queries hurting your database? Discover indexing strategies, query execution analysis with EXPLAIN ANALYZE, and connection pooling setups.",
    thumbnail_url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
    tags: ["database", "postgres", "sql"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "React Server Components vs Client Components",
    content: "Demystifying the boundaries between Server and Client components in modern React apps. Understand when to use 'use client' and how data flows.",
    thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    tags: ["react", "nextjs", "javascript"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Securing Web Applications with JWT and OAuth 2.0",
    content: "A detailed walkthrough on authentication strategies. Understand token rotation, secure cookie storage, and integrating third-party OAuth providers.",
    thumbnail_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    tags: ["security", "auth", "webdev"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Getting Started with Tailwind CSS v4",
    content: "Explore the new features, simplified configuration, and performance improvements in the latest release of Tailwind CSS.",
    thumbnail_url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800",
    tags: ["tailwindcss", "css", "frontend"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Dockerizing a Full-Stack Application",
    content: "Step-by-step guide to containerizing a React frontend, Node backend, and MongoDB database using Docker Compose for seamless deployment.",
    thumbnail_url: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
    tags: ["docker", "devops", "fullstack"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Optimizing Web Vitals for Better SEO",
    content: "Core Web Vitals directly impact search engine rankings. Learn actionable techniques to reduce LCP, INP, and CLS scores.",
    thumbnail_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    tags: ["seo", "performance", "webdev"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "GraphQL vs REST: Choosing the Right API Paradigm",
    content: "Compare data fetching flexibility, over-fetching issues, caching strategies, and developer experience between GraphQL and traditional REST APIs.",
    thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    tags: ["graphql", "api", "backend"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "CI/CD Pipelines with GitHub Actions",
    content: "Automate testing, linting, and continuous deployment to cloud providers directly from your GitHub repository using customizable workflows.",
    thumbnail_url: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
    tags: ["devops", "github", "automation"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Mastering Async/Await in JavaScript",
    content: "Avoid common pitfalls with asynchronous JavaScript. Learn error handling with try/catch, parallel execution with Promise.all, and event loop behavior.",
    thumbnail_url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    tags: ["javascript", "coding", "webdev"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Designing Intuitive UI/UX for Web Apps",
    content: "Key principles of user interface design, including visual hierarchy, color theory, accessible contrast, and micro-interactions that delight users.",
    thumbnail_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800",
    tags: ["design", "uiux", "frontend"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Introduction to Redis for Caching and Pub/Sub",
    content: "Boost your application speed using Redis as an in-memory cache, session store, and real-time pub/sub messaging system.",
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    tags: ["redis", "database", "backend"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Building Real-Time Web Apps with WebSockets",
    content: "Learn how to establish bi-directional communication channels using WebSockets and Socket.io for chat applications, live feeds, and notifications.",
    thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    tags: ["websockets", "nodejs", "realtime"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "A Beginner's Guide to Git and Version Control",
    content: "Master essential Git commands: branching, merging, rebasing, and resolving merge conflicts without losing your work.",
    thumbnail_url: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
    tags: ["git", "tools", "workflow"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Exploring Micro-Frontends Architecture",
    content: "Break down monolithic frontends into smaller, independently deployable micro-apps using Module Federation and web components.",
    thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    tags: ["architecture", "frontend", "javascript"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Effective State Management in React",
    content: "Compare Context API, Zustand, Redux Toolkit, and Jotai to determine the best state management solution for your project's scale.",
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    tags: ["react", "javascript", "state-management"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  },
  {
    title: "Serverless Functions with AWS Lambda",
    content: "Discover how to build event-driven, cost-effective API endpoints and backend processing tasks using serverless architecture.",
    thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    tags: ["aws", "serverless", "cloud"],
    authorId: "Sh0PAPpbLk75cQWqagraFB7iySpJhcYk"
  }
];


const seedPosts = async (post:any) => {
    try {
        

        // const newPost = await fetch("http://localhost:3000/api/posts/create-post", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Origin": "http://localhost:3000",
        //     },
        //     body: JSON.stringify(post),
        // });

        const newPost = await postService.createPostService(post);
        // console.log( newPost);
        if (newPost) {
            console.log('Post seeded successfully');
            console.log(newPost);
        }
    
    } catch (error) {
        console.error('Error seeding post:', error);
    }
}

posts.forEach(async (post) => {
    await seedPosts(post);
})