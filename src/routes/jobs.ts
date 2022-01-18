import type { FastifyPluginAsync } from 'fastify';
import type { FromSchema } from 'json-schema-to-ts';
import { In } from 'typeorm';
import { Job } from '../entities/Job';

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
                type: 'number'
            }
        },
    },
    required: ['ids[]'],
} as const;

export const jobs: FastifyPluginAsync = async (app) => {
    app.addHook('preHandler', app.auth([app.verifyJwt]));

    app.route<{ Querystring: FromSchema<typeof findJobidsParams> }>({
        url:'/',
        method: "GET",
        schema: {querystring: findJobidsParams},
        handler: async (req,reply) => {
            let idOrIds = req.query['ids[]'];

            const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds]

            
            const jobs = await app.orm.manager.findByIds(Job, ids);
            return jobs;
     }
    })

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
