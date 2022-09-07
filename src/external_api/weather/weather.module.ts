import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
  ],
  providers: [WeatherRepository],
  exports: [WeatherRepository],
})
export class WeatherModule {}
