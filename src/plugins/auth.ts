import { FastifyPluginAsync } from 'fastify';
import fastifyAuth, { FastifyAuthFunction } from 'fastify-auth';
import fp from 'fastify-plugin';

export const authPlugin: FastifyPluginAsync = fp(async (app) => {
    const verifyJwt: FastifyAuthFunction = async (req, reply) => {
    };

    app.decorate('verifyJwt', verifyJwt);

    app.register(fastifyAuth);
});
