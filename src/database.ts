import type { ConnectionOptions } from 'typeorm';
import type { FastifyInstance } from 'fastify';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SCHEMA, DB_LOGGING } from './config';
import { ConnectionManager, createConnection, EntityManager, useContainer } from 'typeorm';
import { Container as TypeormContainer } from 'typeorm-typedi-extensions';
import { Container } from 'typedi';

export const dbConfig: ConnectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: DB_LOGGING,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    schema: DB_SCHEMA,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: ['src/subscribers/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    },
};

export async function setupDatabase(app: FastifyInstance): Promise<void> {
    useContainer(TypeormContainer);

    await createConnection(dbConfig);

    const connectionManager = Container.get(ConnectionManager);

    Container.set(EntityManager, connectionManager.get('default').manager);
}

export default dbConfig;
