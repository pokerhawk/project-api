// Imports do Nest
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// Import do Passport
import { Strategy } from 'passport-local';
// Import da Aplicação
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    validateUser(email: string, password: string) {
        return this.authService.validateUser(email, password);
    }
}
