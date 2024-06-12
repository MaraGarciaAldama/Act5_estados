import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Location, City } from '@prisma/client';

@Injectable()
export class LocationsService {

  constructor(private prisma: PrismaService) { }

  async getAllLocations(): Promise<Location[]> {
    return this.prisma.location.findMany();
  }

  async createLocation(createLocationDto: CreateLocationDto ): Promise<Location> {
    const { cityId, name } = createLocationDto;
    try {
      const existingLocation = await this.prisma.location.findFirst({
        where: {
          name: {
            equals: name, // Busca directamente el nombre proporcionado
            mode: 'insensitive', // Hace la consulta insensible a mayúsculas y minúsculas
          },
          cityId,
        },
      });
      if (existingLocation) {
        throw new NotFoundException('City already exists in this state');
        }
      console.log('sin error al buscar duplicados');
    } catch (error) {
      console.log(error);
    }

    try {
      return this.prisma.location.create({
        data: {
          name, // Utiliza el nombre proporcionado directamente
          cityId
        }
      });
    } catch (error) {
      console.log(error);
    }
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

