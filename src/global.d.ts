import { FastifyAuthFunction } from 'fastify-auth';

declare module 'fastify' {
    export interface FastifyInstance {
        verifyJwt: FastifyAuthFunction;
    }
}
