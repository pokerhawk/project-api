import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SalesModule } from './modules/Sales/sales.module';
import { UserModule } from './modules/User/user.module';
import { ExternalApiModule } from './modules/Weather/external-api.module';

@Module({
  imports: [SalesModule, UserModule, AuthModule, ExternalApiModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
