import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1711456789123 implements MigrationInterface {
  name = 'InitialMigration1711456789123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "name" character varying(50) NOT NULL,
                "email" character varying(100) NOT NULL,
                "password" character varying(100) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "car" (
                "id" SERIAL NOT NULL,
                "brand" character varying(50) NOT NULL,
                "model" character varying(50) NOT NULL,
                "description" text NOT NULL,
                "price" decimal(10,2) NOT NULL,
                "image" character varying(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_773a59a1418f3649d0073b9b1d9" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
