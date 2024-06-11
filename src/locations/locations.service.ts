import { Injectable, NotFoundException } from '@nestjs/common';
//import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Location } from '@prisma/client';



@Injectable()
export class LocationsService {
  
  constructor(private prisma: PrismaService) {}

  async getAllLocations(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async createLocation(location: Prisma.LocationCreateInput): Promise<Location> {
    return this.prisma.location.create({
      data: location,
    });
  }

  async updateLocation(id: number, location: Prisma.LocationUpdateInput): Promise<Location> {
    await this.getLocationById(id);
    return this.prisma.location.update({
      data: location,
      where: {
        id,
      },
    });
  }

  async deleteLocation(id: number): Promise<Location> {
    await this.getLocationById(id);
    return this.prisma.location.delete({
      where: {
        id,
      },
    });
  }

  async getLocationById(id: number): Promise<Location> {
    const location = await this.prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      throw new NotFoundException(`Locality ${id} not found`);
    }

    return location;
  }
}

