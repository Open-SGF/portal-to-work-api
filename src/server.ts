import { SERVER_LOGGING, SERVER_PORT } from './config';
import { build } from './app';
import { setupQueues } from './queue';

const app = build({ logger: SERVER_LOGGING });

setupQueues(app);

app.listen(SERVER_PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
