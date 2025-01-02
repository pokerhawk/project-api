import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { ExternalApiService } from './external-api.service';
import { ExternalApiController } from './external-api.controller';
import { WeatherService } from 'src/services/weather-api/weather.service';

@Module({
  imports: [ClientModule],
  controllers: [ExternalApiController],
  providers: [ExternalApiService, WeatherService],
  exports: [ExternalApiService]
})
export class ExternalApiModule {}
