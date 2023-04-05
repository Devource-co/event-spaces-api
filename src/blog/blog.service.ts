import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, BLOG_TYPE } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create({
      ...createBlogDto,
    });
    await blog.save();
    return blog;
  }

  findAll(type?: BLOG_TYPE) {
    return this.blogRepository.find({
      ...(type && { where: { type } }),
      select: ['public_id', 'title', 'thumbnail', 'createdAt', 'id'],
    });
  }

  findOne(id: string) {
    const blog = this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Blog with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.findOne(id);
    await this.blogRepository.save({
      ...updateBlogDto,
      id,
    });
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.blogRepository.delete(id);
  }
}
