import type { ProcessPromiseFunction } from 'bull';
import { EntityManager } from 'typeorm';
import { Job } from '../entities/Job';
import { Container } from 'typedi';

const jobsImport: ProcessPromiseFunction<null> = async (job) => {
    const manager = Container.get(EntityManager);

    await manager.find(Job);
};

export default jobsImport;
