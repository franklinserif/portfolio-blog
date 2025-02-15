import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CreateUserDto } from '@application/dtos/users/createUser.dto';
import { CreateTagDto } from '../tags/createTag';

export class CreatePostDto {
    @IsUUID()
    id!: string;

    @IsString()
    title!: string;

    @IsString()
    content!: string;

    @ValidateNested()
    @Type(() => CreateUserDto)
    user!: CreateUserDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateTagDto)
    tags!: CreateTagDto[];
}
