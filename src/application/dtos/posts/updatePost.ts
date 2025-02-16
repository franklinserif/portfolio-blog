import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from '@application/dtos/posts/createPost';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    commentsId?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tagsId?: string[];
}
