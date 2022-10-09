import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceScheduleDto } from './dto/create-space-schedule.dto';
import { UpdateSpaceScheduleDto } from './dto/update-space-schedule.dto';
import { SpaceSchedule } from './entities/space-schedule.entity';

@Injectable()
export class SpaceScheduleService {
  constructor(
    @InjectRepository(SpaceSchedule)
    private spaceScheduleRepository: Repository<SpaceSchedule>,
  ) {}
  async create(createSpaceScheduleDto: CreateSpaceScheduleDto) {
    const schedule = this.spaceScheduleRepository.create(
      createSpaceScheduleDto,
    );
    await schedule.save();
    return schedule;
  }

  async createWeek(createSpaceScheduleDto: CreateSpaceScheduleDto[]) {
    const scheduleEntities = this.spaceScheduleRepository.create(
      createSpaceScheduleDto,
    );
    await this.spaceScheduleRepository.insert(scheduleEntities);
    return scheduleEntities;
  }

  findAll(spaceId?: string) {
    return this.spaceScheduleRepository.find({
      ...(spaceId && { where: { space_id: spaceId } }),
    });
  }

  findOne(id: string) {
    return this.spaceScheduleRepository.findBy({ id });
  }

  async update(id: string, updateSpaceScheduleDto: UpdateSpaceScheduleDto) {
    const spaceSchedule = await this.findOne(id);
    if (spaceSchedule) {
      return this.spaceScheduleRepository.save({
        ...spaceSchedule,
        ...updateSpaceScheduleDto,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `space schedule with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  remove(id: string) {
    return this.spaceScheduleRepository.delete({ id });
  }
}
