import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
  PaginationTypeEnum,
} from 'nestjs-typeorm-paginate';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space, SPACE_STATUS } from './entities/space.entity';

interface SearchSpaceArgs {
  options: IPaginationOptions;
  q: string;
  activity: string;
  typeSpace: string;
  status: SPACE_STATUS | 'all';
  coords: [string, string];
  distance: number;
}

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
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
    status: SPACE_STATUS | 'all',
  ): Promise<Pagination<Space>> {
    return paginate<Space>(this.spacesRepository, options, {
      relations,
      where: {
        ...(status !== 'all' && { status: status ?? SPACE_STATUS.ACTIVE }),
      },
    });
  }

  async searchSpace({
    options,
    q,
    activity,
    status,
    coords,
    distance,
  }: SearchSpaceArgs) {
    const origin = {
      type: 'Point',
      coordinates: coords,
    };

    const qb = this.spacesRepository
      .createQueryBuilder('spaces')
      .leftJoinAndSelect('spaces.address', 'address');
    if (coords.length === 2) {
      qb.addSelect(
        'ST_Distance(address.location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(address.location)))/1000',
        'address_distance',
      ).where(
        'ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) , :range)',
      );
    }
    if (activity) {
      qb.leftJoin('spaces.activities', 'activities').andWhere(
        'activities.name = :activity',
      );
    }
    if (status !== 'all') {
      qb.andWhere('spaces.status = :status');
    }
    if (q) {
      const query = `${q.trim().replace(/ /g, ' & ')}:*`;
      qb.andWhere('spaces.document_with_weights @@ to_tsquery(:query)')
        .addSelect(
          'ts_rank(spaces.document_with_weights, to_tsquery(:query))',
          'ranking',
        )
        .addOrderBy('ranking', 'DESC')
        .setParameter('query', query);
    }
    qb.leftJoinAndSelect('spaces.images', 'images').setParameters({
      range: distance * 1000,
      origin: JSON.stringify(origin),
      activity,
      status,
    });

    const totalItems = await qb.getCount();

    return paginate<Space>(qb, {
      ...options,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      metaTransformer: ({ currentPage, itemCount, itemsPerPage }) => {
        // Calculating the total of pages
        const totalPages = Math.round(totalItems / itemsPerPage);
        return {
          currentPage,
          itemCount,
          itemsPerPage,

          // Returning in this two row
          totalItems,
          totalPages: totalPages === 0 ? 1 : totalPages,
        };
      },
    });
  }

  async findAllByUser(
    options: IPaginationOptions,
    relations: string[] = [],
    userId: string,
    status: SPACE_STATUS | 'all',
  ): Promise<Pagination<Space>> {
    return paginate<Space>(this.spacesRepository, options, {
      relations,
      where: {
        owner_id: userId,
        ...(status !== 'all' && { status: status ?? SPACE_STATUS.ACTIVE }),
      },
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
        schedule: true,
        faqs: true,
        owner: true,
      },
      relationLoadStrategy: 'query',
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
        schedule: true,
        faqs: true,
      },
    });
  }

  async remove(id: string) {
    return this.spacesRepository.softDelete(id);
  }
}
