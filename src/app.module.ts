import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ UsersModule,CoreModule,
  JwtModule.register({
    global: true,
    secret: 'super_secret_key',
    signOptions:{expiresIn:'12h'}
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
