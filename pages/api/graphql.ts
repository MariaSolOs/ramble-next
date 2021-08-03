import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/client';
import type { NextApiHandler, PageConfig } from 'next';

import { typeDefs } from 'graphql-server/schema';
import { resolvers } from 'graphql-server/resolvers';
import mongodbConnection from 'mongodb-connection';

let cachedHandler: NextApiHandler | undefined = undefined;

const handler: NextApiHandler = async (req, res) => {
    await mongodbConnection();

    const session = await getSession({ req });

    if (!cachedHandler) {
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
            context: {
                userId: session?.user.userId || ''
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