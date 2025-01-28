import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  providers: [EventsGateway]
})
export class EventsModule {}
