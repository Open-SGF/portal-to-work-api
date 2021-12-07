import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEvents1638841899720 implements MigrationInterface {
    name = 'AddEvents1638841899720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "link" character varying, "startAt" TIMESTAMP NOT NULL, "endAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "locationId" integer, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_55ad94f5c1b4c97960d6d7dc115" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_55ad94f5c1b4c97960d6d7dc115"`);
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_b42eb62a0da91cc26d953db93cd"`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
