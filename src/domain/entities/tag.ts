import { Tag as TypeOrmTag } from '@infrastructure/entities/tag.entity';

export class Tag {
    id: string;
    name: string;

    constructor({ id, name }: Tag) {
        this.id = id;
        this.name = name;
    }

    static serializeTag(typeOrmTag: TypeOrmTag): Tag {
        const tag = new Tag({
            id: typeOrmTag.id,
            name: typeOrmTag.name
        });

        return tag;
    }

    static serializeAll(typeOrmTags: Array<TypeOrmTag>): Array<Tag> {
        return typeOrmTags.map((TTag) => this.serializeTag(TTag));
    }
}
