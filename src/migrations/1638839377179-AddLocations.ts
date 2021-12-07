import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocations1638839377179 implements MigrationInterface {
    name = 'AddLocations1638839377179';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "locations"`);
    }
}
