import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUUID,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateCommentDto {
    @IsUUID()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    comment!: string;

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

    @IsUUID()
    @IsNotEmpty()
    postId!: string;
}
