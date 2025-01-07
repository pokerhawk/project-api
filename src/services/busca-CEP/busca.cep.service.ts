import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class CepService {
    
    private readonly baseURL: string = "https://viacep.com.br/ws";

    constructor(){}

    async searchZipCode (zipCode: string){
        const { data } = await axios.get(`${this.baseURL}/${zipCode}/json/`);
        return data;
    }
}