import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { StateService } from './state.service';
import { City, State } from '@prisma/client';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Post()
  create(@Body() stateData: { name: string }): Promise<State> {
    return this.stateService.createState(stateData);
  }

  @Get()
  findAll(): Promise<State[]> {
    return this.stateService.getStates();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<State> {
    return this.stateService.getStateById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() stateData: { name: string }): Promise<State> {
    return this.stateService.updateState(+id, stateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<State> {
    return this.stateService.deleteState(+id);
  }

  @Get(':id')
  getCity(@Param('id', ParseIntPipe) id: number): Promise<State> {
    return this.stateService.getStateById(id);
  }
}