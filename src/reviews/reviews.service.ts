import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create(createReviewDto);
    await review.save();
    return review;
  }

  findAll() {
    return this.reviewRepository.find();
  }

  findBySpaceOwner(id: string) {
    return this.reviewRepository.find({
      where: { space: { owner_id: id } },
    });
  }

  findOne(id: string) {
    return this.reviewRepository.findOne({ where: { id } });
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewRepository.update(id, updateReviewDto);
  }

  remove(id: string) {
    return this.reviewRepository.delete(id);
  }
}
