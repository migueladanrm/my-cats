import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1651520224005 implements MigrationInterface {
    name = 'InitialMigration1651520224005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "breed" character varying(64) NOT NULL, "description" character varying(300), "birthdate" date, "profile_picture" character varying(128), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_seen" TIMESTAMP, CONSTRAINT "PK_7704d5c2c0250e4256935ae31b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_aad5842554387ee4ac802df41a" ON "cat" ("name") `);
        await queryRunner.query(`CREATE TABLE "cat_tracking" ("id" SERIAL NOT NULL, "point" geometry(Point,4326), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "cat_id" uuid NOT NULL, CONSTRAINT "PK_1c9ce0fa2b1ba6a85a46eda62fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cat_tracking" ADD CONSTRAINT "FK_d7955529bfb8d76679237b6132b" FOREIGN KEY ("cat_id") REFERENCES "cat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cat_tracking" DROP CONSTRAINT "FK_d7955529bfb8d76679237b6132b"`);
        await queryRunner.query(`DROP TABLE "cat_tracking"`);
        await queryRunner.query(`DROP INDEX "mycats"."IDX_aad5842554387ee4ac802df41a"`);
        await queryRunner.query(`DROP TABLE "cat"`);
    }

}
