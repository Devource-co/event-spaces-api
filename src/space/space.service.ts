import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { FilesService } from '../files/files.service';
import { AddressService } from '../address/address.service';
import { ActivityService } from '../activities/activities.service';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
    private fileService: FilesService,
    private addressService: AddressService,
    private activitiesService: ActivityService,
  ) {}
  async create(createSpaceDto: CreateSpaceDto, userId: string) {
    const space = this.spacesRepository.create({
      ...createSpaceDto,
      images: [],
      activities: [],
      owner_id: userId,
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
    return this.spacesRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
        address: true,
        activities: true,
        amenities: true,
        accessMethods: true,
        rules: true,
      },
    });
  }

  async update(id: string, updateSpaceDto: UpdateSpaceDto, userId: string) {
    const space = await this.spacesRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });
    if (space.owner_id !== userId) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Unable to edit, space does not belong to you.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    let dataUpdate = {
      id,
      ...space,
      ...updateSpaceDto,
    };
    const isUpdateImages = !!updateSpaceDto.images?.length;
    if (isUpdateImages) {
      const newImages = updateSpaceDto.images.map((imageId) => ({
        id: imageId,
      }));
      const images = [...space.images, ...newImages];

      dataUpdate = {
        ...dataUpdate,
        images,
      };
    }

    const isUpdateActivities = !!updateSpaceDto.activities?.length;
    if (isUpdateActivities) {
      const activities = updateSpaceDto.activities.map((activityId) => ({
        id: activityId,
      }));
      dataUpdate = {
        ...dataUpdate,
        activities,
      };
    }
    const isUpdateAmenities = !!updateSpaceDto.amenities?.length;
    if (isUpdateAmenities) {
      const amenities = updateSpaceDto.amenities.map((amenityId) => ({
        id: amenityId,
      }));
      dataUpdate = {
        ...dataUpdate,
        amenities,
      };
    }
    const isUpdateAcessMethods = !!updateSpaceDto.accessMethods?.length;
    if (isUpdateAcessMethods) {
      const accessMethods = updateSpaceDto.accessMethods.map(
        (accessMethodId) => ({
          id: accessMethodId,
        }),
      );
      dataUpdate = {
        ...dataUpdate,
        accessMethods,
      };
    }
    console.log(dataUpdate);
    await this.spacesRepository.save(dataUpdate);
    return await this.spacesRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
        address: true,
        activities: true,
        amenities: true,
        accessMethods: true,
        rules: true,
      },
    });
  }

  async remove(id: string) {
    return this.spacesRepository.delete(id);
  }
}
