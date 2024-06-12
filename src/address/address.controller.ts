import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, Prisma } from '@prisma/client';
import { UpdateLocationDto } from 'src/locations/dto/update-location.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() newAddress: CreateAddressDto) {
    return this.addressService.createAddress({...newAddress} as any);
  }

  @Get()
  findAll() {
    return this.addressService.getAllAddress();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number): Promise <Address>  {
    return this.addressService.getAddressById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() AddressData: UpdateLocationDto) {
    return this.addressService.updateAddress(id, AddressData as Prisma.AddressUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.deleteAddress(id);
  }
}
