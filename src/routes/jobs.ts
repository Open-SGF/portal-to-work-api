import type { FastifyPluginAsync } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import { Job } from '../entities/Job';
import { Container } from 'typedi';
import { EntityManager } from 'typeorm';
import GeocodingService from "../services/GeocodingService";

const findJobParams = {
    type: 'object',
    properties: {
        jobId: { type: 'number' },
    },
    required: ['jobId'],
} as const;

const findJobidsParams = {
    type: 'object',
    properties: {
        'ids[]': {
            type: ['array', 'number'],
            items: {
                type: 'number',
            },
        },
    },
    required: ['ids[]'],
} as const;

export const jobRoutes: FastifyPluginAsync = async (app) => {
    app.addHook('preHandler', app.authenticate);

    app.route<{ Querystring: FromSchema<typeof findJobidsParams> }>({
        url: '/',
        method: 'GET',
        schema: { querystring: findJobidsParams },
        handler: async (req, reply) => {
            const idOrIds = req.query['ids[]'];

            const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
            GeocodingService.getCoordsFromAddress('1840 S Weller Ave, Springfield, MO 65804');

            const manager = Container.get(EntityManager);
            return await manager.findByIds(Job, ids);
        },
    });

    app.route<{ Params: FromSchema<typeof findJobParams> }>({
        url: '/:jobId',
        method: 'GET',
        schema: { params: findJobParams },
        handler: async (req, reply) => {
            const jobId = req.params.jobId;
            const manager = Container.get(EntityManager);
            const job = await manager.findOne(Job, jobId);

            if (!job) {
                reply.code(404);
                throw new Error(`job with id ${jobId} not found`);
            }

            return job;
        },
    });
};
