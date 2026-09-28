import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendVerificationMail } from "./verificationEmail";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    trustedOrigins: [process.env.APP_URL as string],
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN"],
                defaultValue: "USER",
                required: false,
                },
            phone: {
                type: "string",
                required: false,
            },
            status: {
                type: ["ACTIVE", "INACTIVE"],
                defaultValue: "ACTIVE",
                required: false,
            },
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: false,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ( { user, url, token }, request) => {
        await sendVerificationMail([user.email]);
    },
    },
    baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

});
