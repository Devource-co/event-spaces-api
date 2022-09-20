import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseArrayPipe,
  UseGuards,
} from '@nestjs/common';
import { SpaceRulesService } from './space-rules.service';
import { CreateSpaceRuleDto } from './dto/create-space-rule.dto';
import { UpdateSpaceRuleDto } from './dto/update-space-rule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  version: '1',
  path: 'space-rules',
})
export class SpaceRulesController {
  constructor(private readonly spaceRulesService: SpaceRulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSpaceRuleDto: CreateSpaceRuleDto) {
    return this.spaceRulesService.create(createSpaceRuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bulk-create')
  createBulk(
    @Body(new ParseArrayPipe({ items: CreateSpaceRuleDto }))
    createSpaceRuleDto: CreateSpaceRuleDto[],
  ) {
    return this.spaceRulesService.bulkCreate(createSpaceRuleDto);
  }

  @Get()
  findAll() {
    return this.spaceRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceRulesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpaceRuleDto: UpdateSpaceRuleDto,
  ) {
    return this.spaceRulesService.update(id, updateSpaceRuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceRulesService.remove(id);
  }
}
