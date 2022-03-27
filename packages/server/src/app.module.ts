import { Module } from '@nestjs/common';
import { SocketGateway } from 'src/socket.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
