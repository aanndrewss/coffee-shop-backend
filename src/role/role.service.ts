import { Injectable, NotFoundException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateOrUpdateRoleDto } from './dto/createOrUpdateRole.dto'

@Injectable()
export class RoleService {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateOrUpdateRoleDto): Promise<Role> {
		return this.prisma.role.create({ data })
	}

	async findAll(): Promise<Role[]> {
		return this.prisma.role.findMany()
	}

	async findByValue(value: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({ where: { value } })

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}

	async update(id: number, data: CreateOrUpdateRoleDto): Promise<Role | null> {
		const role = await this.prisma.role.update({ where: { id }, data })

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}

	async remove(id: number): Promise<Role | null> {
		const role = await this.prisma.role.delete({ where: { id } })

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}
}
