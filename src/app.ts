import 'reflect-metadata';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyTypeorm from 'fastify-typeorm-plugin';

import { dbConfig } from './database';
import { jobRoutes } from './routes/jobs';
import { authRoutes } from './routes/auth';
import { authPlugin } from './plugins/auth';

export function build(opts: FastifyServerOptions = {}): FastifyInstance {
    const app = fastify(opts);

    app.register(fastifyTypeorm, dbConfig);

    app.register(authPlugin);

    app.register(jobRoutes, { prefix: '/jobs' });
    app.register(authRoutes, { prefix: '/auth' });

    return app;
}
