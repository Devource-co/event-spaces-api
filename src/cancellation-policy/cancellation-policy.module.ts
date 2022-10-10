import { Module } from '@nestjs/common';
import { CancellationPolicyService } from './cancellation-policy.service';
import { CancellationPolicyController } from './cancellation-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancellationPolicy } from './entities/cancellation-policy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CancellationPolicy])],
  controllers: [CancellationPolicyController],
  providers: [CancellationPolicyService],
})
export class CancellationPolicyModule {}
