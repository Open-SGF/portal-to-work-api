import 'reflect-metadata';
import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

import { jobRoutes } from './routes/jobs';
import { authRoutes } from './routes/auth';
import { authPlugin } from './plugins/auth';
import { setupQueues } from './queue';
import { setupDatabase } from './database';

export async function build(opts: FastifyServerOptions = {}): Promise<FastifyInstance> {
    const app = fastify(opts);

    await setupDatabase(app);
    setupQueues(app);

    app.register(authPlugin);

    app.register(jobRoutes, { prefix: '/jobs' });
    app.register(authRoutes, { prefix: '/auth' });

    return app;
}
