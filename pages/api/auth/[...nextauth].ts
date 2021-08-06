import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import getGraphQLClient from 'graphQLClient';
import { 
    SignUpDocument,
    SignUpMutation,
    SignUpMutationVariables, 
    LogInDocument,
    LogInMutation,
    LogInMutationVariables
} from 'graphql-server/operations';

type Credentials = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const graphQLClient = getGraphQLClient();

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        jwt: true,
        maxAge: 15 * 24 * 60 * 60, // Idle session expires after 15 days
    },
    jwt: {
        signingKey: process.env.JWT_SIGNING_KEY!
    },
    debug: process.env.VERCEL_ENV === 'development',
    providers: [
        Providers.Credentials({
            async authorize(credentials: Credentials) {
                try {
                    const isNewUser = Boolean(credentials.firstName);

                    if (isNewUser) {
                        const data = await graphQLClient.request<SignUpMutation, SignUpMutationVariables>(SignUpDocument, {
                            email: credentials.email,
                            password: credentials.password,
                            firstName: credentials.firstName!,
                            lastName: credentials.lastName!
                        });
                        return {
                            userId: data.signUpUser._id,
                            creatorId: '', // Cannot be a creator if just signed up
                            firstName: data.signUpUser.firstName,
                            email: data.signUpUser.email,
                            photo: { // Cannot have a picture if just signed up
                                src: '',
                                placeholder: ''
                            } 
                        }
                    } else {
                        const data = await graphQLClient.request<LogInMutation, LogInMutationVariables>(LogInDocument, {
                            email: credentials.email,
                            password: credentials.password
                        });
                        
                        return {
                            userId: data.logInUser._id,
                            creatorId: data.logInUser.creator?._id || '',
                            firstName: data.logInUser.firstName,
                            email: data.logInUser.email,
                            photo: {
                                src: data.logInUser.photo?.src || '',
                                placeholder: data.logInUser.photo?.placeholder || ''
                            }
                        }
                    }
                } catch (err) {
                    const errorMessage = err.message || "We couldn't sign you in.";
                    throw errorMessage;
                }
            }
        })
    ],
    callbacks: {
        async jwt(token, user) { 
            if (user) {
                // We're signing in, so store user data in the token
                return { ...token, ...user }
            } else {
                // Return the token which already has user data
                return token;
            }
        },
        session(session, token) {
            return { 
                user: {
                    userId: token.userId,
                    creatorId: token.creatorId,
                    firstName: token.firstName,
                    email: token.email,
                    photo: token.photo
                },
                expires: session.expires
            }
        }
    }
});