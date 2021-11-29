import type { FastifyPluginAsync } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import { Job } from '../entities/Job';

const findJobParams = {
    type: 'object',
    properties: {
        jobId: { type: 'number' },
    },
    required: ['jobId'],
} as const;

export const jobs: FastifyPluginAsync = async (app) => {
    app.get('/', async (req, reply) => {
        const jobs = await app.orm.manager.find(Job);
        return jobs;
    });

    app.route<{ Params: FromSchema<typeof findJobParams> }>({
        url: '/:jobId',
        method: 'GET',
        schema: { params: findJobParams },
        handler: async (req, reply) => {
            const jobId = req.params.jobId;
            const job = await app.orm.manager.findOne(Job, jobId);
            return job;
        },
    });
};
