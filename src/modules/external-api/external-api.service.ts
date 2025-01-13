import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { WeatherService } from 'src/services/weather-api/weather.service';

@Injectable()
export class ExternalApiService {
    constructor(
        private readonly prisma: ClientService,
        private readonly weatherService: WeatherService
    ){}

    async weatherApi(city: string){
        return await this.weatherService.currentWeatherByCity(city);
    }
}