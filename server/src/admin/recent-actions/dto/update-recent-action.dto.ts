import { PartialType } from '@nestjs/swagger';
import { CreateRecentActionDto } from './create-recent-action.dto';

export class UpdateRecentActionDto extends PartialType(CreateRecentActionDto) {}
