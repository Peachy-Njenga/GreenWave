import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import prisma from "./lib/prisma"
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

// as described in the lucia documentation
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            // set it secure for the production, it's ok for it to not be secrue in the development 
            secure: process.env.NODE_ENV === "production"
        }
    },

    // add fields on the user object that we get returned by lucia, since we only get the id by default
    getUserAttributes(databaseUserAttributes) {
        return {
            id: databaseUserAttributes.id,
            username: databaseUserAttributes.username,
            displayName: databaseUserAttributes.displayName,
            avatarUrl: databaseUserAttributes.avatarUrl,
            googleId: databaseUserAttributes.googleId
        }
    },
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    id: string,
    username: string,
    displayName: string,
    avatarUrl: string | null,
    googleId: string | null
}

// called whenever we needto fetch the current user of the session
export const validateRequest = cache(
    async (): Promise<
        { user: User, session: Session } | { user: null, session: null }
    > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

        if (!sessionId){
            return {
                user: null, 
                session: null
            }
        }
        const result = await lucia.validateSession(sessionId);

        try {
            if (result.session && result.session.fresh){
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                )
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes
                );
            }
        } catch {}

        return result;

    },

)
