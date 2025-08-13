import { PartialType } from '@nestjs/swagger';
import { CreateMonoPayDto } from './create-mono-pay.dto';

export class UpdateMonoPayDto extends PartialType(CreateMonoPayDto) {}
