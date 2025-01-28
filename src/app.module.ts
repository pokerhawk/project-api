import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { BackOfficeModule } from './modules/back-office/back.office.module';
import { UserModule } from './modules/user/user.module';
import { SalesModule } from './modules/sales/sales.module';
import { TaskModule } from './modules/task/task.module';
import { ExternalApiModule } from './modules/external-api/external-api.module';
import { MathModule } from './modules/math/math.module';
import { EventsModule } from './modules/web-socket/events.module';

@Module({
  imports: [
    AuthModule,
    BackOfficeModule,
    UserModule,
    SalesModule,
    TaskModule,
    ExternalApiModule,
    MathModule,
    EventsModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
