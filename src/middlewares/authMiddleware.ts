import { NextFunction, Request, Response } from "express"
import { auth } from "../lib/auth";

export const authMiddleware = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const session = await auth.api.getSession(
            {
                headers: req.headers as any
            }
        );
        console.log("Session:", session);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (Number(new Date("2026-10-06T17:13:46.711Z")) - Number(new Date()) < 0) {
            return res.status(401).json({ error: "Session expired" });
        }
        if (!session.user.emailVerified){
            return res.status(403).json({ error: "Email not verified" });
        }
        if (!roles.includes(session.user.role as string)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role as string,
            emailVerified: session.user.emailVerified
        };

        next()
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}