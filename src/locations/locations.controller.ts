import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Prisma, Location } from '@prisma/client';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() newLocation: CreateLocationDto) {
    return this.locationsService.createLocation({...newLocation} as any);
  }

  @Get()
  findAll() {
    return this.locationsService.getAllLocations();
  }

  @Get(':id')
  getLocation(@Param('id', ParseIntPipe) id:number): Promise <Location>  {
    return this.locationsService.getLocationById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() LocationData: UpdateLocationDto) {
    return this.locationsService.updateLocation(id, LocationData as Prisma.LocationUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.deleteLocation(id);
  }
}
