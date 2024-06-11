import { PartialType } from '@nestjs/common';
import { CreateCityDto } from './create-city.dto';
import { Prisma } from '@prisma/client';

export class UpdateCityDto {
    name?: string;
  }