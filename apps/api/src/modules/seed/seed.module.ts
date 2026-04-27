import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { Security } from '../securities/security.entity';
import { User } from '../users/user.entity';
import { Broker } from '../brokers/broker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Security, User, Broker])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
