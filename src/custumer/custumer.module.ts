import { Module } from '@nestjs/common';
import { CustumerService } from './custumer.service';
import { CustumerController } from './custumer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CustumerController],
  providers: [CustumerService, PrismaService],
})
export class CustumerModule {}
