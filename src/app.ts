import 'reflect-metadata';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyTypeorm from 'fastify-typeorm-plugin';

import { dbConfig } from './database';
import { jobs } from './routes/jobs';
import { events } from './routes/events';
import { auth } from './routes/auth';

export function build(opts: FastifyServerOptions = {}): FastifyInstance {
    const app = fastify(opts);

    app.register(fastifyTypeorm, dbConfig);

    app.register(jobs, { prefix: '/jobs' });
    app.register(events, { prefix: '/events'});
    app.register(auth, { prefix: '/auth' });

    return app;
}
