import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';

@Module({
  controllers: [LocationsController, LocationsService],
  providers: [LocationsService],
})
export class LocationsModule {}
