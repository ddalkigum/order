import {MigrationInterface, QueryRunner} from "typeorm";

export class user1640267383472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`CREATE TABLE user (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            phone_number varchar(11) NOT NULL,
            nick_name varchar(50) NOT NULL,
            created_at timestamp(6) NOT NULL DEFAULT current_timestamp(6),
            updated_at timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE user');
    }

}
