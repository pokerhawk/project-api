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

  private clients: Record<string, Record<string, string>> = {};

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const queryParams = client.handshake.query;
    // const headers = client.handshake.headers;
    // const clientIp = client.handshake.address;

    const user = await this.prisma.user.findUnique({where:{id: `${queryParams.userId}`}});


    this.clients[client.id] = {};
    this.setName(user.name, user.id, client);
    console.log(`Client connected: ${user.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.clients[client.id];
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: MessageProps, @ConnectedSocket() client: Socket) {
    console.log(`Message received: ${data.message} from ${data.sender}`);
    const senderName = this.clients[client.id].name;
    const message = {
      sender: senderName,
      senderClientId: client.id,
      message: data.message
    }

    // Broadcast the message to all other clients
    client.broadcast.emit('message', message);

    // Optionally send an acknowledgment back to the sender
    return { event: 'message', data: message };
  }

  @SubscribeMessage('setName')
  setName(@MessageBody() name: string, @MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const user = this.clients[client.id];
    user.userId = userId;
    user.name = name;
    client.emit('nameSet', { id: client.id, name });
  }
}

