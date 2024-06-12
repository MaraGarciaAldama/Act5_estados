import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma.service';
import { Address, Prisma } from '@prisma/client';

@Injectable()
export class AddressService {

  constructor(private prisma: PrismaService) { }

  async createAddress(address: Prisma.AddressCreateInput): Promise <Address> {
    return this.prisma.address.create({
      data: address
    })
  }

  async getAllAddress(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }

  async getAddressById(id: number): Promise<Address> {
    const address = await this.prisma.address.findUnique({
      where: {
        id},
        
    });

    if (!address) {
      throw new NotFoundException(`Locality ${id} not found`);
    }

    return address;
  }

  async updateAddress(id: number, address: Prisma.AddressUpdateInput): Promise<Address> {
    await this.getAddressById(id);
    return this.prisma.address.update({
      data: address,
      where: {
        id,
      },
    });
  }

  async deleteAddress(id: number): Promise<Address> {
    await this.getAddressById(id);
    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
