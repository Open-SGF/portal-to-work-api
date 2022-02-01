import { preHandlerHookHandler } from 'fastify';
import { User } from './entities/User';

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: preHandlerHookHandler;
    }
}

declare module 'fastify-jwt' {
    interface FastifyJWT {
        user: User;
    }
}
