import NextAuth from 'next-auth';
import type { Image } from 'models/files';

declare module 'next-auth' {
    interface User {
        userId: string;
    }
    interface Session {
        user: {
            userId: string;
            creatorId: string;
            firstName: string;
            email: string;
            photo: Image;
        }
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        userId: string;
        iat: number;
        exp: number;
    }
}