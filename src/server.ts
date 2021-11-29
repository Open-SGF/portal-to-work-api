import { SERVER_PORT } from './config';
import { build } from './app';

const app = build({ logger: true });

app.listen(SERVER_PORT, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
