import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CancellationPolicyService } from './cancellation-policy.service';
import { CreateCancellationPolicyDto } from './dto/create-cancellation-policy.dto';
import { UpdateCancellationPolicyDto } from './dto/update-cancellation-policy.dto';

@Controller({
  version: '1',
  path: 'cancellation-policy',
})
export class CancellationPolicyController {
  constructor(
    private readonly cancellationPolicyService: CancellationPolicyService,
  ) {}

  @Post()
  create(@Body() createCancellationPolicyDto: CreateCancellationPolicyDto) {
    return this.cancellationPolicyService.create(createCancellationPolicyDto);
  }

  @Get()
  findAll() {
    return this.cancellationPolicyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cancellationPolicyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCancellationPolicyDto: UpdateCancellationPolicyDto,
  ) {
    return this.cancellationPolicyService.update(
      id,
      updateCancellationPolicyDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancellationPolicyService.remove(id);
  }
}
