import { PartialType } from '@nestjs/swagger';
import { CreateNovaPostDto } from './create-nova-post.dto';

export class UpdateNovaPostDto extends PartialType(CreateNovaPostDto) {}
