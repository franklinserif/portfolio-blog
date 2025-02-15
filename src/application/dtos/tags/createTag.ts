import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
    @IsUUID()
    id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}
