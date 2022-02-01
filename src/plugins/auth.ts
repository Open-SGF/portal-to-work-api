import { preHandlerHookHandler } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import { APP_SECRET_KEY } from '../config';

export const authPlugin = fp(async (app) => {
    app.register(fastifyJwt, {
        secret: APP_SECRET_KEY,
    });

    const authenticate: preHandlerHookHandler = async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    };

    app.decorate('authenticate', authenticate);
});
