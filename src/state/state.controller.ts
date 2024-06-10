import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from '@prisma/client';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async create(@Body() stateData: { name: string }): Promise<State> {
    return this.stateService.createState(stateData);
  }

  @Get()
  async findAll(): Promise<State[]> {
    return this.stateService.getStates();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<State> {
    return this.stateService.getStateById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() stateData: { name: string }): Promise<State> {
    return this.stateService.updateState(+id, stateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<State> {
    return this.stateService.deleteState(+id);
  }

  @Get(':id/cities')
  async getCities(@Param('id') id: string): Promise<City[]> {
    const state = await this.stateService.getStateById(+id);
    return state.cities;
  }
}