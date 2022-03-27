import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { Socket } from "dgram";
import { v4 as uuidv4 } from "uuid";

interface MySocket extends Socket {
  id?: string;
}

@WebSocketGateway(3001, {
  path: "/socket",
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private clients: { [id: string]: MySocket } = {};

  handleConnection(client: MySocket) {
    client.id = uuidv4();
    this.clients[client.id] = client;
  }

  handleDisconnect(client: MySocket) {
    delete this.clients[client.id];
  }

  @SubscribeMessage("socket")
  handleEvent(@MessageBody() data: string) {
    Object.values(this.clients).forEach((client) => {
      client.send(JSON.stringify(data));
    });
  }
}
