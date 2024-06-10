import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import {PrismaService } from 'src/prisma.service';

@Module({
  providers: [StateService],
  controllers: [StateController, PrismaService]
})
export class StateModule {}
