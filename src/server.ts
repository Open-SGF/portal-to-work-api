import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { FastifyAdapter } from '@bull-board/fastify';

import { SERVER_LOGGING, SERVER_PORT } from './config';
import { build } from './app';
import { jobsImportQueue } from './queue';

const app = build({ logger: SERVER_LOGGING });

const serverAdapter = new FastifyAdapter();

createBullBoard({
    queues: [new BullAdapter(jobsImportQueue)],
    serverAdapter,
});

serverAdapter.setBasePath('/queue');

// @ts-ignore
app.register(serverAdapter.registerPlugin(), { prefix: '/queue' });

app.listen(SERVER_PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
