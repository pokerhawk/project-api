import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { AuthController } from './auth.controller';
import { LoginValidationMiddleware } from 'src/middlewares/login-validation.middleware';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { ApiKeyStrategy } from './strategies/apikey.strategy';
import { ClientModule } from 'src/client/client.module';
import { WeatherService } from 'src/services/weather-api/weather.service';

@Module({
  imports: [
    PassportModule,
    ClientModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, TwoFactorAuthService, JwtStrategy, LocalStrategy, ApiKeyStrategy, WeatherService],
  exports: [AuthService, TwoFactorAuthService]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
