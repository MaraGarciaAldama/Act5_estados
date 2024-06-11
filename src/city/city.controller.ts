import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { City, Location } from '@prisma/client';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.createCity({
      name: createCityDto.name,
      state: { connect: { id: createCityDto.stateId } },
    });
  }

  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.getCities();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<City> {
    return this.cityService.getCityById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto): Promise<City> {
    return this.cityService.updateCity(+id, updateCityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<City> {
    return this.cityService.deleteCity(+id);
  }

  @Get(':id')
  async getLocations(@Param('id', ParseIntPipe) id: number): Promise<City> {
  return await this.cityService.getCityById(id);
  }
}
