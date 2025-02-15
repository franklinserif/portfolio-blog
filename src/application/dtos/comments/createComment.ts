import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostDto } from '@application/dtos/posts/createPost';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsEmail()
    @MinLength(3)
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    emailHash!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    content!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    fullName!: string;

    @ValidateNested()
    @Type(() => CreatePostDto)
    user!: CreatePostDto;
}
