import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface User {
        userId: string;
        creatorId: string;
        firstName: string;
        email: string;
        photo: string;
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
        photo: string;
        iat: number;
        exp: number;
    }
}