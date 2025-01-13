import { Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import { transformToDate } from 'src/utils/date/adjust-date';

@Injectable()
export class MathService {
    constructor(
        private readonly prisma: ClientService,
    ){}

    async solarDeclination(){
        const today = new Date()
        const year = new Date().getFullYear()
        //equinox march 20-21 | 0° 
        //solstice june 20-21 | 23.5° 
        //equinox september 22-23 | 0° 
        //solstice december 21-22 | -23.5° 

        const startOfYear = transformToDate(`${year}-01-01`, 'gte')
        const dayOfTheYear = Math.ceil((today.getTime() - startOfYear.getTime()) / (1000*60*60*24));
        const currentMonth = today.getMonth()+1
        const currentDay = today.getDate()
        
        const lastDeclination = () =>{
            if((currentMonth >= 12 && currentDay >= 22) || (currentMonth <= 3 && currentDay <= 20)){
                return 'Solstice December'
            }
            if(currentMonth >= 9 && currentDay >= 23){
                return 'Equinox September'
            }
            if(currentMonth >= 6 && currentDay >= 21){
                return 'Solstice June'
            }
            if(currentMonth >= 3 && currentDay >= 21){
                return 'Equinox March'
            }
        }

        const solarDeclination = (-23.44 * Math.cos((360/365.25) * (dayOfTheYear)));
        const truncatedSolarDeclination = Math.abs(Math.floor(solarDeclination * 100) / 100);
        let sunDirection: string;
        switch(lastDeclination()){
            case 'Equinox March':
                sunDirection = 'going towards North'
                break;
            case 'Solstice June':
                sunDirection = 'going towards South'
                break;
            case 'Equinox September':
                sunDirection = 'going towards South'
                break;
            case 'Solstice December':
                sunDirection = 'going towards North'
                break;
        }
        
        return {
            solarDeclination: solarDeclination > 0 ?
            `The sun is approximately ${truncatedSolarDeclination}° above the equator line, ${sunDirection}`:
            `The sun is approximately ${truncatedSolarDeclination}° below the equator line, ${sunDirection}`,
            lastDeclination: lastDeclination()
        }
    }
}
