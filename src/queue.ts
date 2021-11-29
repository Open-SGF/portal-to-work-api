import Queue from 'bull';
import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './config';

const redisConfig = {
    port: REDIS_PORT,
    host: REDIS_HOST,
    password: REDIS_PASSWORD,
}

const jobsImportQueue = new Queue('jobs-import', { redis: redisConfig });

jobsImportQueue.process(`${__dirname}/queue-jobs/jobs-import.ts`);

jobsImportQueue.add(null, { repeat: { cron: '* * * * *' } });

export {
    jobsImportQueue,
}
