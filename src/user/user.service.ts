import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { RoleService } from 'src/role/role.service'
import { CreateOrUpdateUserDto } from './dto/createOrUpdateUser.dto'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private roleService: RoleService
	) {}

	async create(data: CreateOrUpdateUserDto): Promise<User> {
		const role = await this.roleService.findByValue('Customer')
		const user = await this.prisma.user.create({
			data: {
				...data,
				roles: {
					create: [
						{
							roleId: role.id
						}
					]
				}
			}
		})

		return user
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({ include: { roles: true } })
	}

	async findOne(id: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { id } })

		if (!user) throw new NotFoundException('User not found!')
		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { email } })

		return user
	}

	async update(id: number, data: CreateOrUpdateUserDto): Promise<User | null> {
		const user = await this.prisma.user.update({ where: { id }, data })

		if (!user) throw new NotFoundException('User not found!')
		return user
	}

	async remove(id: number): Promise<User | null> {
		const user = await this.prisma.user.delete({ where: { id } })

		if (!user) throw new NotFoundException('User not found!')
		return user
	}
}
