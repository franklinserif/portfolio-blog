import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsUUID()
    @IsString()
    id!: string;

    @IsString()
    @MinLength(2)
    firstName!: string;

    @IsString()
    @MinLength(2)
    lastName!: string;

    @IsString()
    @IsEmail()
    email!: string;

    @IsString()
    password!: string;
}
