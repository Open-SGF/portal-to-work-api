import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobs1638841344534 implements MigrationInterface {
    name = 'AddJobs1638841344534';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "occupationId" integer, "companyId" integer, "locationId" integer, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD CONSTRAINT "FK_7157538b49480e6f51a61c35bb1" FOREIGN KEY ("occupationId") REFERENCES "occupations"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" ADD CONSTRAINT "FK_5dbffa782dc6074a7e4cb39150d" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP CONSTRAINT "FK_5dbffa782dc6074a7e4cb39150d"`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP CONSTRAINT "FK_6ce4483dc65ed9d2e171269d801"`,
        );
        await queryRunner.query(
            `ALTER TABLE "jobs" DROP CONSTRAINT "FK_7157538b49480e6f51a61c35bb1"`,
        );
        await queryRunner.query(`DROP TABLE "jobs"`);
    }
}
