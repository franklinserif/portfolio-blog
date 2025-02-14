import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    title!: string;

    @Column('text')
    content!: string;

    @ManyToOne(() => User, (user) => user.posts)
    user!: User;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags!: Tag[];

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
