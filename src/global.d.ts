import { preHandlerHookHandler } from 'fastify';

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: preHandlerHookHandler;
    }
}
