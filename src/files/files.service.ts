import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { File } from './entities/files.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async fileUpload(data: Express.Multer.File, url: string, folder = 'space') {
    try {
      const { buffer, originalname, mimetype } = data;
      console.log(data);
      const name = `/files/${folder}/${uuidv4()}-${originalname}`;
      const fileName = `static${name}`;
      writeFileSync(fileName, buffer);
      const fileData = await this.filesRepository.create({
        url: url + name,
        type: mimetype,
        model: folder,
      });
      await fileData.save();
      return fileData;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Kindly try again later',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    return this.filesRepository.findOne(id);
  }
}
