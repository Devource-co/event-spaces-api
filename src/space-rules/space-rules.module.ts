import { Module } from '@nestjs/common';
import { SpaceRulesService } from './space-rules.service';
import { SpaceRulesController } from './space-rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceRule } from './entities/space-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceRule])],
  controllers: [SpaceRulesController],
  providers: [SpaceRulesService],
})
export class SpaceRulesModule {}
