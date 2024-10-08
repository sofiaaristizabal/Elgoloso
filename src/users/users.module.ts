import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  imports:[TypeOrmModule.forFeature([User]), 
  PassportModule.register({defaultStrategy:'jwt'}), 
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory: async()=>{
      return{
        secret: process.env.SECRET_PASSWORD,
        signOptions: {expiresIn: '1h'}
      }
    }
  })
],
  
  exports:[PassportModule, JwtModule, JwtStrategy, TypeOrmModule]
})
export class UsersModule {}
