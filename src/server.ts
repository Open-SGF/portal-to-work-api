import 'reflect-metadata';
import fastify from 'fastify';

import { SERVER_PORT } from './config';

const server = fastify();

server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

server.listen(SERVER_PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
