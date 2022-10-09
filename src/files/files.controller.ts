import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileQueryDTO } from './dto/FileQuery.dto';
import { FilesService } from './files.service';

@Controller({
  version: '1',
  path: 'files',
})
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  async getAll() {
    return this.filesService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
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

  @Post('bulk-upload')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      storage: diskStorage({
        destination: './static/files/space',
        filename(req, file, callback) {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          callback(null, `${uuidv4()}.${fileExt}`);
        },
      }),
    }),
  )
  async bulkUploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: any,
  ) {
    const url = `${req.protocol}://${req.get('Host')}`;
    return this.filesService.bulkFileUpload(files, url);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.filesService.delete(id);
  }
}
