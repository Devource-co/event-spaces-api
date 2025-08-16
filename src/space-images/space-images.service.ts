import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceImageDto } from './dto/create-space-image.dto';
import { UpdateSpaceImageDto } from './dto/update-space-image.dto';
import { SpaceImage } from './entities/space-image.entity';
import * as AWS from 'aws-sdk';
import PresignedDTO from './dto/presigned-image.dto';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Injectable()
export class SpaceImagesService {
  constructor(
    @InjectRepository(SpaceImage)
    private spaceImagesRepository: Repository<SpaceImage>,
  ) {}
  async create(createSpaceImageDto: CreateSpaceImageDto) {
    const image = this.spaceImagesRepository.create(createSpaceImageDto);
    await image.save();
    return image;
  }

  findAll(spaceId: string) {
    return this.spaceImagesRepository.find({
      where: { ...(spaceId && { space_id: spaceId }) },
    });
  }

  findOne(id: string) {
    return this.spaceImagesRepository.findOneBy({ id });
  }

  update(id: string, updateSpaceImageDto: UpdateSpaceImageDto) {
    return this.spaceImagesRepository.update(id, updateSpaceImageDto);
  }

  remove(id: string) {
    return this.spaceImagesRepository.delete({ id });
  }

  async generatePresigned(presignedDTO: PresignedDTO) {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'findyspace-dev',
      Key: presignedDTO.fileName,
      ContentType: presignedDTO.fileType,
      Expires: 60,
    };

    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      return { url };
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to generate pre-signed URL: ${err.message}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
