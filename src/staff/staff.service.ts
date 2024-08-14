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

  async create(createStaffDto: CreateStaffDto) {
    const staff = this.staffRepository.create(createStaffDto);
    await this.staffRepository.save(staff);
    delete staff.password;
    return staff;
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
    return this.staffRepository.update(id, updateStaffDto);
  }

  remove(id: string) {
    return this.staffRepository.softDelete(id);
  }
}
