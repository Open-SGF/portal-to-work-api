import 'reflect-metadata';
import fastify from 'fastify';
import fastifyTypeormPlugin from 'fastify-typeorm-plugin';

import { dbConfig } from './database';
import { SERVER_PORT } from './config';

const server = fastify();

server.register(fastifyTypeormPlugin, dbConfig);

server.listen(SERVER_PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
