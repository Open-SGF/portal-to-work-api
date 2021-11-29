import Queue from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { FastifyAdapter } from '@bull-board/fastify';
import { FastifyInstance } from 'fastify';

import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './config';

const redisConfig = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
}

export const queues = {
    jobsImport: new Queue('jobs-import', { redis: redisConfig })
} as const;

export function setupQueueProcessors(): void {
    queues.jobsImport.process(`${__dirname}/queue-handlers/jobs-import.ts`);
}

export function setupRepeatingJobs(): void {
    queues.jobsImport.add(null, { repeat: { cron: '* * * * *' } });
}

export function setupQueueUi(app: FastifyInstance): void {
    const serverAdapter = new FastifyAdapter();

    const adaptedQueues = Object.values(queues).map(queue => new BullAdapter(queue));

    createBullBoard({
        queues: adaptedQueues,
        serverAdapter,
    });

    serverAdapter.setBasePath('/queue');

    // @ts-ignore
    app.register(serverAdapter.registerPlugin(), { prefix: '/queue' });
}

export function setupQueues(app: FastifyInstance) {
    setupQueueProcessors();
    setupRepeatingJobs();
    setupQueueUi(app);
}
