import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import {PrismaService } from 'src/prisma.service';

@Module({
  providers: [StateService, PrismaService],
  controllers: [StateController]
})
export class StateModule {}
