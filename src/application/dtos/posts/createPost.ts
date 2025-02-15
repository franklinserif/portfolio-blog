import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
    @IsUUID()
    id!: string;

    @IsString()
    title!: string;

    @IsString()
    content!: string;

    @IsString()
    urlPath!: string;

    @IsUUID()
    userId!: string;

    @IsOptional()
    @IsString()
    @IsArray({ each: true })
    tagsId!: string[];
}
