import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';
import { FilesService } from 'src/files/files.service';
import { AddressService } from 'src/address/address.service';
import { ActivityService } from 'src/activities/activities.service';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
    private fileService: FilesService,
    private addressService: AddressService,
    private activitiesService: ActivityService,
  ) {}
  async create(createSpaceDto: CreateSpaceDto) {
    const space = this.spacesRepository.create({
      ...createSpaceDto,
      images: [],
      activities: [],
    });
    await space.save();
    return space;
  }

  async findAll(
    options: IPaginationOptions,
    relations: string[] = [],
    published = true,
  ): Promise<Pagination<Space>> {
    return paginate<Space>(this.spacesRepository, options, {
      relations,
      where: { ...(published && { publish: true }) },
    });
  }

  async findOne(id: string) {
    return this.spacesRepository.findOne(id, {
      relations: ['images'],
    });
  }

  async update(id: string, updateSpaceDto: UpdateSpaceDto) {
    const space = await this.spacesRepository.findOne(id, {
      relations: ['images'],
    });
    let dataUpdate = {
      id,
      ...space,
      ...updateSpaceDto,
    };
    const isUpdateImages = !!updateSpaceDto.images?.length;
    if (isUpdateImages) {
      space.images.forEach(({ id }) => {
        updateSpaceDto.images.push(id);
      });
      const images = [];
      await updateSpaceDto.images?.forEach(async (id) => {
        const image = await this.fileService.findOne(id);
        images.push(image);
      });

      dataUpdate = {
        ...dataUpdate,
        images,
      };
    }
    const isUpdateActivities = !!updateSpaceDto.activities?.length;
    if (isUpdateActivities) {
      const activities = [];
      updateSpaceDto.activities?.forEach(async (id) => {
        const activity = await this.activitiesService.findOne(id);
        activities.push(activity);
      });
      dataUpdate = {
        activities,
        ...dataUpdate,
      };
    }
    return this.spacesRepository.save(dataUpdate);
  }

  async remove(id: string) {
    return this.spacesRepository.delete(id);
  }
}
