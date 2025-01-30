import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('comments')
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    comment!: string;

    @Column('text')
    email!: string;

    @Column('text')
    fullName!: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;
}
