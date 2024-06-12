import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CustumerService } from './custumer.service';
import { CreateCustumerDto } from './dto/create-custumer.dto';
import { UpdateCustumerDto } from './dto/update-custumer.dto';
import { Custumer, Prisma } from '@prisma/client';

@Controller('custumer')
export class CustumerController {
  constructor(private readonly custumerService: CustumerService) {}

  @Post()
  create(@Body() createCustumerDto: CreateCustumerDto) {
    return this.custumerService.createCustumer({...createCustumerDto} as any);
  }

  @Get()
  findAll() {
    return this.custumerService.getAllCustumer();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number): Promise <Custumer>  {
    return this.custumerService.getCustumerById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() AddressData: UpdateCustumerDto) {
    return this.custumerService.updateAddress(id, AddressData as Prisma.CustumerUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.custumerService.deleteAddress(id);
  }
}
