import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    comment!: string;

    @Column('text')
    email!: string;

    @Column('text')
    emailHash!: string;

    @Column('text')
    fullName!: string;

    @ManyToOne(() => Post, (post) => post.comments)
    post!: Post;

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
