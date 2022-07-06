import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransformInterceptor } from 'src/utils/transform.interceptor';
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
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const url = `${req.protocol}://${req.get('Host')}`;
    return await this.filesService.fileUpload(file, url);
  }
}
