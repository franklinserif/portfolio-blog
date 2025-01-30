import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Post } from './post.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    firstName!: string;

    @Column('text')
    lastName!: string;

    @Column('text', { unique: true })
    email!: string;

    @Column('text')
    password!: string;

    @OneToMany(() => Post, (posts) => posts.user, { nullable: true })
    posts?: Post[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;
}
