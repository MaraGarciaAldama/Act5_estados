import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { State, Prisma } from '@prisma/client';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  private normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  async createState(data: Prisma.StateCreateInput): Promise<State> {
    const normalizedNombre = this.normalizeString(data.name);

    const existingState = await this.prisma.state.findFirst({
      where: {
        name: {
          equals: normalizedNombre,
          mode: 'insensitive',
        },
      },
    });

    if (existingState) {
      throw new BadRequestException('State already exists');
    }

    return this.prisma.state.create({
      data,
    });
  }

  async getStates(): Promise<State[]> {
    return this.prisma.state.findMany();
  }

  async getStateById(id: number): Promise<State> {
    return this.prisma.state.findUnique({
      where: { id },
      include: { cities: true },
    });
  }

  async updateState(id: number, data: Prisma.StateUpdateInput): Promise<State> {
    return this.prisma.state.update({
      where: { id },
      data,
    });
  }

  async deleteState(id: number): Promise<State> {
    return this.prisma.state.delete({
      where: { id },
    });
  }
}