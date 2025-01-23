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

    async numberToRoman(number: number){
        const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        const hrns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
        const ths = ["", "M", "MM", "MMM"];

        const floor = (n1:number, n2:number) => Math.floor(n1/n2);
        return ths[floor(number, 1000)]+hrns[floor(number % 1000, 100)]+tens[floor(number % 100, 10)] + ones[number % 10];
    }

    async romanToNumber(numeral: string){
        const romanNumerals = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000
        }
        const numeralArray = numeral.split('');

        let res = romanNumerals[numeralArray[0]];

        for(let i = 1; i < numeralArray.length; i++){
            const current = romanNumerals[numeralArray[i]];
            const next = romanNumerals[numeralArray[i+1]];
            if(current < next){
                res = res + (next - current)
                i++;
            }
            if(res >= current && (current >= next || next === undefined)){
                res += current
            }
            if(res < current){
                res -= current
            }
        }

        return res<0?-res:res;
    }
}
