import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    title!: string;

    @Column('text', { unique: true })
    urlPath!: string;

    @Column('text')
    content!: string;

    @ManyToOne(() => User, (user) => user.posts)
    user!: User;

    @ManyToMany(() => Tag, { eager: true })
    @JoinTable()
    tags!: Tag[];

    @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
    comments!: Comment[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt!: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.title = this.title.trim().toLowerCase();
        this.content = this.content.trim().toLowerCase();
    }
}
