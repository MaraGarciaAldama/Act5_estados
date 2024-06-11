import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { Prisma } from '@prisma/client';

export class UpdateCityDto {
    name?: string;
    stateId?: number;
  }