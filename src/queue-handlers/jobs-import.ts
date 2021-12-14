import type { ProcessPromiseFunction } from 'bull';
import { Connection, createConnection } from 'typeorm';
import dbConfig from '../database';
import { Job } from '../entities/Job';

let db: Connection;

const jobsImport: ProcessPromiseFunction<null> = async (job) => {
    if (!db) {
        db = await createConnection(dbConfig);
    }

    await db.manager.find(Job);
};

export default jobsImport;
