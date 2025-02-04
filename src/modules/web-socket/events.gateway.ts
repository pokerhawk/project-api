import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { User } from 'prisma/generated/client';
import { Server, Socket } from 'socket.io';
import { ClientService } from 'src/client/client.service';

type MessageProps = {
  sender: string;
  type?: string;
  message: string;
}

type PrivateMessageProps = {
  sender: string;
  to: string;
  type?: string;
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

  handleConnection(client: Socket) {
    const queryParams = client.handshake.query;
    // const headers = client.handshake.headers;
    // const clientIp = client.handshake.address;

    this.prisma.user.findUnique({where:{id: `${queryParams.userId}`}}).then((user: User)=>{
      if(!user){
        console.log("Can't connect, no user found!")
      } else {
        this.clients[client.id] = {};
        this.setName(user.name, user.id, client);
        this.getClients(client);
      }
    })
  }

  handleDisconnect(client: Socket) {
    const user = this.clients[client.id];
    this.handleMessage({
      sender: user.userName,
      message: 'Disconnected!'
    }, client);
    delete this.clients[client.id];
    this.getClients(client);
    return { event: 'disconnect', data: 'disconnected' }
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: MessageProps, @ConnectedSocket() client: Socket) {
    const senderName = this.clients[client.id].userName;
    const message = {
      sender: senderName,
      senderClientId: client.id,
      message: data.message,
      date: new Date()
    }

    // Broadcast the message to all other clients
    client.broadcast.emit('message', message);

    // Optionally send an acknowledgment back to the sender
    return { event: 'message', data: message };
  }

  @SubscribeMessage('private_message')
  handlePrivateMessage(@MessageBody() data: PrivateMessageProps, @ConnectedSocket() client: Socket) {
    const senderName = this.clients[client.id].userName;
    const message = {
      sender: senderName,
      senderClientId: client.id,
      message: data.message,
      date: new Date()
    }

    // Emit the message to a specific client
    client.to(data.to).emit('private_message', message);

    // Optionally send an acknowledgment back to the sender
    return { event: 'message', data: message };
  }

  @SubscribeMessage('setName')
  setName(@MessageBody() name: string, @MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const user = this.clients[client.id];
    user.userId = userId;
    user.userName = name;
    client.emit('nameSet', { id: client.id, name });
  }

  @SubscribeMessage('clients')
  getClients(@ConnectedSocket() client: Socket) {
    //Broadcast to everyone else
    client.broadcast.emit('clients', this.clients);
    //Emit back to itself
    client.emit('clients', this.clients);
  }
}
