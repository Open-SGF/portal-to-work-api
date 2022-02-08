import { SERVER_LOGGING, SERVER_PORT } from './config';
import { build } from './app';
import 'reflect-metadata';

async function start() {
    const app = await build({ logger: SERVER_LOGGING });

    app.listen(SERVER_PORT, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}

start();
