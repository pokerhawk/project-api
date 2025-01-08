import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { userToReturnMapper } from 'src/utils/mappers/user-to-return.mapper';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { CepService } from 'src/services/busca-CEP/busca.cep.service';
import { WeatherService } from 'src/services/weather-api/weather.service';

export type loginProps = {
    userId: string;
    password: string;
    code: string;
}

type userJwtProps = {
    sub: string;
    email: string;
    name?: string;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: ClientService,
        private readonly jwtService: JwtService,
        private readonly twoFactorService: TwoFactorAuthService,
        private readonly cepService: CepService,
        private readonly weatherService: WeatherService
    ){}

    validateApiKey(apiKey: string){
        const apiKeys: string[] = [process.env.API_KEY];
        return apiKeys.find(key => key == apiKey)
    }

    async validateUser(email: string, password: string){
        const user = await this.prisma.user.findUnique({where: {email: email}})
        if (user && await bcrypt.compare(password, user.password)) {
            return userToReturnMapper(user);
        }
    }

    async register(userPayload: CreateUserDto){
        const user = {
            ...userPayload,
            password: bcrypt.hashSync(userPayload.password, 10)
        };

        const emailExists = await this.prisma.user.findFirst({
            where:{email: user.email}
        })

        if(emailExists)
        throw new BadRequestException("Este email já existe")

        const address = await this.cepService.searchZipCode(user.zipcode)
        
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                zipcode: user.zipcode,
                ddd: address.ddd,
                state: address.estado,
                uf: address.uf,
                city: address.localidade,
                region: address.regiao,
                street: address.logradouro,
                number: user.number,
                extra: user?.extra
            }
        })
        return 'Cadastrado com sucesso!'
    }

    async isAuthenticated(email: string){
        const user = await this.prisma.user.findFirst({where:{email}});
        
        if(user.mfaEnabled){
            return user.mfaEnabled;
        } else {
            const qrcode = await this.twoFactorService.generateTwoFactorAuthSecret(user.email);
            return {
                qrcode
            };
        }
    }

    async login(body: loginProps){
        const user = await this.prisma.user.findFirst({where:{id: body.userId}})
        const weather = await this.weatherService.currentWeatherByCity(user.city);
        const verifyCode = await this.twoFactorService.verifyTwoFaCode(body.code, user)
        const validateUser = await this.validateUser(user.email, body.password);
        
        const userJwt: userJwtProps = {
            sub: validateUser.id,
            email: validateUser.email,
            name: validateUser.name,
        };

        if(verifyCode && user.mfaEnabled){
            return {
                message: `Bem vindo ${user.name}`,
                weather,
                userId: user.id,
                type: user.accountAccess,
                access_token: this.jwtService.sign(userJwt),
                refresh_token: this.jwtService.sign(userJwt, { expiresIn: '60d' }),
            }
        }
        return {
            Error: "Codigo incorreto!"
        }
    }
}