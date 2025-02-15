import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from '@application/dtos/tags/createTag';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
