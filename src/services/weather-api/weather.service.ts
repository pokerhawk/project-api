import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class WeatherService implements OnModuleInit {
    
    private callsLeft: number;
    private readonly apiKey: string;
    private readonly baseURL: string = "http://api.weatherapi.com/v1";
    private readonly apiHeader: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    constructor(
        private readonly prisma: ClientService,
    ){
        this.apiKey = process.env.WEATHER_API_KEY;
    }

    async onModuleInit() {
        const apiInfo: any = await this.prisma.aPIs.findFirst({
            where: {apiName: "WeatherAPI"}
        })
        this.callsLeft = apiInfo.infoJson.callsLeftMonth;
        if(!apiInfo){
            this.callsLeft = 5000000
            return await this.prisma.aPIs.create({
                data: {
                    apiName: "WeatherAPI",
                    infoJson: {
                        callsLeftMonth: 5000000,
                    }
                }
            })
        }
    }

    async currentWeatherByCity(city: string){        
        if(this.callsLeft != 0){
            const update = await this.prisma.aPIs.update({
                where: {apiName: "WeatherAPI"},
                data: {
                    infoJson: {
                        callsLeftMonth: this.callsLeft - 1,
                    }
                }
            })

            this.callsLeft -= 1;
            
            const { data }: any = await axios.get(`${this.baseURL}/current.json?key=${this.apiKey}&q=${city}&lang=pt`, 
                {
                    headers: this.apiHeader
                }
            ).catch(e=>{
                return {
                    statusCode: e.status,
                    message: e.code
                }
            })
    
            console.log(update)
            return data;
        } else {
            return "No calls left, limit was hit"
        }
    }

    async getUserByIds(){
        const { data } = await axios.post(`${this.baseURL}/user/email`, {
                "login": "",
                "password": "",
            }, {headers: this.apiHeader}
        )
    }
}