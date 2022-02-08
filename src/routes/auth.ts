import type { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import { User } from '../entities/User';
import { Container } from 'typedi';
import { EntityManager } from 'typeorm';
import { RecaptchaService } from '../services/RecaptchaService';

const authBodyParams = {
    type: 'object',
    properties: {
        'g-recaptcha-token': { type: 'string' },
    },
    required: ['g-recaptcha-token'],
} as const;

export const authRoutes: FastifyPluginAsync = async (app) => {
    app.route<{ Body: FromSchema<typeof authBodyParams> }>({
        url: '/',
        method: 'POST',
        schema: { body: authBodyParams },
        handler: async (req, reply) => {
            const recaptchaService = Container.get(RecaptchaService);
            const manager = Container.get(EntityManager);

            const token = req.body['g-recaptcha-token'];

            const recaptchaRes = await recaptchaService.verify(token);

            if (!recaptchaRes.success) {
                reply.code(401);
                return;
            }

            const user = new User();

            await manager.save(user);

            const userToken = app.jwt.sign({ user: user }, { expiresIn: '7d' });

            return {
                token: userToken,
            };
        },
    });
};
