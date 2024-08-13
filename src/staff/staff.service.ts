import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}
  create(createStaffDto: CreateStaffDto) {
    return 'This action adds a new staff';
  }

  findAll() {
    return this.staffRepository.find({ relations: { roles: true } });
  }

  findOne(id: string) {
    return this.staffRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.staffRepository.findOneBy({ email });
  }

  update(id: string, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: string) {
    return `This action removes a #${id} staff`;
  }
}
