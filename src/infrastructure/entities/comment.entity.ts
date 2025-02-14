import {
    BeforeInsert,
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

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.comment = this.comment.trim().toLowerCase();
        this.email = this.email.trim().toLowerCase();
        this.fullName = this.fullName.trim().toLowerCase();
    }
}
