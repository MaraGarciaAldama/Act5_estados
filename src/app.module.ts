import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { LocationsModule } from './locations/locations.module';
import { AddressModule } from './address/address.module';
import { CustumerModule } from './custumer/custumer.module';


@Module({
  imports: [StateModule,
    CityModule,
    LocationsModule,
    AddressModule,
    CustumerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
