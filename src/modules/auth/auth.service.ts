import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientService } from 'src/client/client.service';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { userToReturnMapper } from 'src/utils/mappers/user-to-return.mapper';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { CepService, viaCepProps } from 'src/services/busca-CEP/busca.cep.service';
import { WeatherService } from 'src/services/weather-api/weather.service';

export type loginProps = {
    email: string;
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
        return;
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

        let address: viaCepProps;

        if(user.zipcode)
            address = await this.cepService.searchZipCode(user.zipcode)
        
        await this.prisma.user.create({
            data: {
                name: user.name??user.name,
                email: user.email,
                password: user.password,
                zipcode: user.zipcode??user.zipcode,
                ddd: address.ddd,
                state: address.estado,
                uf: address.uf,
                city: address.localidade,
                neighborhood: address.bairro,
                address: address.logradouro,
                number: user.number??user.number,
                complement: user.complement??user.complement
            }
        })
        return 'Cadastrado com sucesso!'
    }

    async isAuthenticated(body: CreateUserDto){
        const user = await this.prisma.user.findUnique({where:{email: body.email}});
        const validateUser = await this.validateUser(user.email, body.password);

        if(!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        if(!validateUser)
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);

        if(user.mfaEnabled){
            return {
                mfaEnabled: user.mfaEnabled
            }
        } else {
            const qrcode = await this.twoFactorService.generateTwoFactorAuthSecret(user.email);
            return {
                mfaEnabled: false,
                qrcode
            };
        }
    }

    async login(body: loginProps){
        const user = await this.prisma.user.findUnique({where:{email: body.email}})
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
        throw new HttpException('Wrong code', HttpStatus.BAD_REQUEST)
    }
}
