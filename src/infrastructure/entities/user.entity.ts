import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    firstName!: string;

    @Column('text')
    lastName!: string;

    @Column('text')
    password!: string;
}
