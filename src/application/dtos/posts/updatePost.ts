import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from '@application/dtos/posts/createPost';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCommentDto } from '../comments/createComment';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateCommentDto)
    comments?: CreateCommentDto[];
}
