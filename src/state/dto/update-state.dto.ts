import { PartialType } from '@nestjs/mapped-types'
import { CreateStateDto } from './create-state.dto';
import { Prisma } from '@prisma/client';

export class UpdateStateDto extends PartialType(CreateStateDto) {
    name?: string

}
