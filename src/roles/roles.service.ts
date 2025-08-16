import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create({ name, permissions }: CreateRoleDto) {
    const role = this.roleRepository.create({ name });
    role.permissions = permissions.map((id) => ({ id }) as Permission);
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({
      relations: { permissions: true },
      relationLoadStrategy: 'query',
    });
  }

  findOne(id: string) {
    return this.roleRepository.findOne({
      where: { id },
      relations: { permissions: true, staffs: true },
    });
  }

  update(id: string, { name, permissions }: UpdateRoleDto) {
    const role = this.roleRepository.create({ name });
    role.permissions = permissions.map((id) => ({ id }) as Permission);
    role.id = id;
    return this.roleRepository.save(role);
  }

  remove(id: string) {
    return this.roleRepository.delete(id);
  }
}
