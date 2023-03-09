import { Injectable, NotFoundException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { RoleDto } from './dto/role.dto'

@Injectable()
export class RoleService {
	constructor(private prisma: PrismaService) {}

	async create(dto: RoleDto): Promise<Role> {
		return this.prisma.role.create({ data: { ...dto } })
	}

	async findAll(): Promise<Role[]> {
		return this.prisma.role.findMany()
	}

	async findByValue(value: string): Promise<Role | null> {
		const role = await this.prisma.role.findUnique({ where: { value } })

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}

	async update(id: number, dto: RoleDto): Promise<Role | null> {
		const role = await this.prisma.role.update({
			where: { id },
			data: { ...dto }
		})

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}

	async remove(id: number): Promise<Role | null> {
		const role = await this.prisma.role.delete({ where: { id } })

		if (!role) throw new NotFoundException('Role not found!')
		return role
	}
}
