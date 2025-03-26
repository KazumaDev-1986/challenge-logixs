import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompletedAtToTask1711456789125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" 
      ADD COLUMN "completedAt" TIMESTAMP
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" 
      DROP COLUMN "completedAt"
    `);
  }
}
