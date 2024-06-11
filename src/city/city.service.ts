import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { City, Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  private normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  async createCity(data: Prisma.CityCreateInput): Promise<City> {
    const normalizedNombre = this.normalizeString(data.name);

    const existingCity = await this.prisma.city.findFirst({
      where: {
        name: {
          equals: normalizedNombre,
          mode: 'insensitive',
        },
        stateId: data.state.connect.id,
      },
    });

    if (existingCity) {
      throw new BadRequestException('City already exists in this state');
    }

    return this.prisma.city.create({
      data,
    });
  }

  async getCities(): Promise<City[]> {
    return this.prisma.city.findMany();
  }

  async getCityById(id: number): Promise<City> {
    return this.prisma.city.findUnique({
      where: { id },
      include: { locations: true },
    });
  }

  async updateCity(id: number, data: Prisma.CityUpdateInput): Promise<City> {
    return this.prisma.city.update({
      where: { id },
      data,
    });
  }

  async deleteCity(id: number): Promise<City> {
    return this.prisma.city.delete({
      where: { id },
    });
  }
}
