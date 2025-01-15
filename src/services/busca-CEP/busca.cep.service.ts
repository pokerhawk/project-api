import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

export type viaCepProps = {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

@Injectable()
export class CepService {
    
    private readonly baseURL: string = "https://viacep.com.br/ws";

    constructor(){}

    async searchZipCode (zipCode: string): Promise<viaCepProps>{
        const { data } = await axios.get(`${this.baseURL}/${zipCode}/json/`);
        return data;
    }
}
