/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "dgram";
interface MySocket extends Socket {
    id?: string;
}
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private clients;
    handleConnection(client: MySocket): void;
    handleDisconnect(client: MySocket): void;
    handleEvent(data: string): void;
}
export {};
