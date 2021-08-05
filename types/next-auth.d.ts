import NextAuth from 'next-auth';
import type { Image } from 'models/files';

declare module 'next-auth' {
    interface User {
        userId: string;
        creatorId: string;
        firstName: string;
        email: string;
        photo: Image;
    }
    interface Session {
        user: User;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        userId: string;
        creatorId: string;
        firstName: string;
        email: string;
        photo: Image;
        iat: number;
        exp: number;
    }
}