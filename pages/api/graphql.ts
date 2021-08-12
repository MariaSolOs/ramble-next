import { ApolloServer } from 'apollo-server-micro';
import { getToken } from 'next-auth/jwt';
import type { NextApiHandler, PageConfig } from 'next';

import { typeDefs } from 'graphql-server/schema';
import { resolvers } from 'graphql-server/resolvers';
import mongodbConnection from 'lib/mongodb-connection';

let cachedHandler: NextApiHandler | undefined = undefined;

const handler: NextApiHandler = async (req, res) => {
    await mongodbConnection();

    if (!cachedHandler) {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: async ({ req }) => {
                const token = await getToken({ 
                    req, 
                    secret: process.env.NEXTAUTH_SECRET, 
                    signingKey: process.env.JWT_SIGNING_KEY 
                });
                const userId = token?.userId || '';
                return { userId }
            }
        });
        cachedHandler = await apolloServer.start().then(() => 
            apolloServer.createHandler({ path: '/api/graphql' })
        );
    }

    return cachedHandler!(req, res);
}

export const config: PageConfig = {
    api: {
        bodyParser: false
    }
}

export default handler;