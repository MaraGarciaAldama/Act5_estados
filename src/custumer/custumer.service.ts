import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustumerDto } from './dto/create-custumer.dto';
import { UpdateCustumerDto } from './dto/update-custumer.dto';
import { PrismaService } from 'src/prisma.service';
import { Custumer, Prisma } from '@prisma/client';

@Injectable()
export class CustumerService {

  constructor(private prisma: PrismaService) { }

  async createCustumer(custumer: Prisma.CustumerCreateInput): Promise <Custumer> {
    return this.prisma.custumer.create({
      data: custumer
    })
  }

  async getAllCustumer(): Promise<Custumer[]> {
    return this.prisma.custumer.findMany();
  }


  async getCustumerById(id: number): Promise<Custumer> {
    const custumer = await this.prisma.custumer.findUnique({
      where: { id },
      include: {
        address: {
          include:{
            location:{
              include:{
                city:{
                  include:{
                    state:true
                  }
                }
              }
            }
          }
        },
      
      },
    });

    if (!custumer) {
      throw new NotFoundException(`Locality ${id} not found`);
    }

    return custumer;
  }

  async updateAddress(id: number, custumer: Prisma.CustumerUpdateInput): Promise<Custumer> {
    await this.getCustumerById(id);
    return this.prisma.custumer.update({
      data: custumer,
      where: {
        id,
      },
    });
  }

  async deleteAddress(id: number): Promise<Custumer> {
    await this.getCustumerById(id);
    return this.prisma.custumer.delete({
      where: {
        id,
      },
    });
  }
}
