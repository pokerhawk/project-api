import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientService } from 'src/client/client.service';

type MessageProps = {
  sender: string;
  type: string;
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*', // Replace with your allowed origin(s)
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly prisma: ClientService,
  ){}
  private clients: Record<string, string> = {};

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    const queryParams = client.handshake.query;
    const headers = client.handshake.headers;
    const clientIp = client.handshake.address;

    this.clients[client.id] = undefined;

    console.log(`Client connected: ${client.id} ${this.clients[client.id]}`);
    // console.log(this.clients)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.clients[client.id];
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: MessageProps, @ConnectedSocket() client: Socket) {
    console.log(`Message received: ${data.message} from ${data.sender}`);
    if(this.clients[client.id] === undefined)
      this.setName(data.sender, client);
    client.broadcast.emit('message', data); // Broadcast the message to all other clients
    return { event: 'message', data }; // Optionally send an acknowledgment back to the sender
  }

  @SubscribeMessage('setName')
  setName(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
    this.clients[client.id] = name;
    console.log(`Client ${client.id} set name to: ${name}`);
    client.emit('nameSet', { id: client.id, name });
  }
}

