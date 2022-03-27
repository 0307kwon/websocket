"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const uuid_1 = require("uuid");
let SocketGateway = class SocketGateway {
    constructor() {
        this.clients = {};
    }
    handleConnection(client) {
        client.id = (0, uuid_1.v4)();
        this.clients[client.id] = client;
    }
    handleDisconnect(client) {
        delete this.clients[client.id];
    }
    handleEvent(data) {
        Object.values(this.clients).forEach((client) => {
            client.send(JSON.stringify(data));
        });
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)("socket"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleEvent", null);
SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, {
        path: "/socket",
    })
], SocketGateway);
exports.SocketGateway = SocketGateway;
//# sourceMappingURL=socket.gateway.js.map