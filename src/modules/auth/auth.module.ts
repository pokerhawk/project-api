import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { AuthController } from './auth.controller';
import { LoginValidationMiddleware } from 'src/middlewares/login-validation.middleware';
import { AllModule } from '../all.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ClientModule } from 'src/client/client.module';
import { ApiKeyStrategy } from './strategies/apikey.strategy';

@Module({
  imports: [
    PassportModule,
    ClientModule,
    AllModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TwoFactorAuthService, JwtStrategy, LocalStrategy, ApiKeyStrategy],
  exports: [AuthService, TwoFactorAuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
