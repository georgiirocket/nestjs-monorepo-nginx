import { PrismaService } from '@app/libs/modules/database/prisma.service';
import { UserDto } from '@app/libs/dto/user/user.dto';
import { CreateUserDto } from '@app/libs/dto/user/create.dto';
import { UpdateUserDto } from '@app/libs/dto/user/update.dto';
import { DeleteUserDto } from '@app/libs/dto/user/delete.dto';
import { Injectable } from '@nestjs/common';
import { UserModel } from '@app/libs/models/user/model';
import { userSelect } from './constants/user-select';

/**
 * Service
 */
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get entities
   */
  async getList(): Promise<UserDto[]> {
    return this.prismaService.user.findMany({
      select: userSelect,
    });
  }

  /**
   * Get entity
   * @param id
   */
  async getView(id: string): Promise<UserDto | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      select: userSelect,
    });
  }

  /**
   * Create entity
   * @param data
   */
  async createEntity(data: CreateUserDto): Promise<UserDto> {
    return this.prismaService.user.create({
      data,
      select: userSelect,
    });
  }

  /**
   * Update entity
   * @param data
   */
  async updateEntity(data: UpdateUserDto): Promise<UserDto> {
    return this.prismaService.user.update({
      where: { id: data.id },
      data: { name: data.name },
    });
  }

  /**
   * Delete entity
   * @param data
   */
  async deleteUser(data: DeleteUserDto): Promise<UserDto> {
    return this.prismaService.user.delete({
      where: data,
      select: userSelect,
    });
  }

  /**
   * Check exist user
   * @param id
   */
  async checkExistUser(id: string): Promise<UserModel | null> {
    return this.prismaService.user.findUnique({ where: { id } });
  }
}
