import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from '@application/dtos/comments/createComment';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
