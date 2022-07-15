import {
  Controller,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from '../utils/transform.interceptor';
import { FileQueryDTO } from './dto/FileQuery.dto';
import { FilesService } from './files.service';

@Controller({
  version: '1',
  path: 'files',
})
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransformInterceptor)
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Query() query: FileQueryDTO,
  ) {
    const url = `${req.protocol}://${req.get('Host')}`;
    return await this.filesService.fileUpload(
      file,
      url,
      query.folder as string,
    );
  }
}
