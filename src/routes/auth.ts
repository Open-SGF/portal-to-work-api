import type { FastifyPluginAsync } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import fetch from 'cross-fetch';
import { GOOGLE_RECAPTCHA_SECRET_KEY } from '../config';

const authBodyParams = {
    type: 'object',
    properties: {
        'g-recaptcha-token': { type: 'string' },
    },
    required: ['g-recaptcha-token'],
} as const;

const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

export interface IRecaptchaResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    error_codes?: string[];
}

export const auth: FastifyPluginAsync = async (app) => {
    app.route<{ Body: FromSchema<typeof authBodyParams> }>({
        url: '/',
        method: 'POST',
        schema: { body: authBodyParams },
        handler: async (req, reply) => {
            const token = req.body['g-recaptcha-token'];

            const res = await fetch(recaptchaVerifyUrl, {
                method: 'POST',
                body: new URLSearchParams({
                    secret: GOOGLE_RECAPTCHA_SECRET_KEY,
                    response: token,
                }),
            });

            const recaptchaRes = (await res.json()) as IRecaptchaResponse;

            if (!recaptchaRes.success) {
                reply.code(401);
                return;
            }

            return {
                token: 'test',
            };
        },
    });
};
