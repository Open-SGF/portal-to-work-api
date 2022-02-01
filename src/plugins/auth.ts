import { preHandlerHookHandler } from 'fastify';
import fp from 'fastify-plugin';
import fastifyJwt from 'fastify-jwt';
import { APP_SECRET_KEY } from '../config';
import { User } from '../entities/User';

interface JwtUser {
    id: number;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    pushToken: string | null;
    createdAt: string;
    updatedAt: string;
}

export const authPlugin = fp(async (app) => {
    app.register(fastifyJwt, {
        secret: APP_SECRET_KEY,
        formatUser: (payload) => {
            if (Buffer.isBuffer(payload) || typeof payload !== 'object') {
                throw new Error('incorrect payload type');
            }

            const jwt: Partial<{ user: JwtUser }> = payload;

            if (!jwt?.user?.id) {
                throw new Error('no id on user object');
            }

            const user = new User();

            user.id = jwt.user.id;
            user.address = jwt.user.address ?? undefined;
            user.latitude = jwt.user.latitude ?? undefined;
            user.longitude = jwt.user.longitude ?? undefined;
            user.pushToken = jwt.user.pushToken ?? undefined;
            user.createdAt = new Date(jwt.user.createdAt);
            user.updatedAt = new Date(jwt.user.updatedAt);

            return user;
        },
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
