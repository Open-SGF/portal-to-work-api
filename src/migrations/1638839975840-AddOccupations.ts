import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOccupations1638839975840 implements MigrationInterface {
    name = 'AddOccupations1638839975840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "occupations" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0bf09083dd897df1e8ebb96b5c1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "occupations"`);
    }

}
