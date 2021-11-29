import 'reflect-metadata';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyTypeorm from 'fastify-typeorm-plugin';

import { dbConfig } from './database';
import { jobs } from './routes/jobs';

export function build(opts: FastifyServerOptions = {}): FastifyInstance {
    const app = fastify(opts);

    app.register(fastifyTypeorm, dbConfig);

    app.register(jobs, { prefix: '/jobs' });

    return app;
}
