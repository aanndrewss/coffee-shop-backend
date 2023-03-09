import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	async create(dto: CategoryDto): Promise<Category> {
		return this.prisma.category.create({ data: { ...dto } })
	}

	async findAll(): Promise<Category[]> {
		return this.prisma.category.findMany()
	}

	async findByName(name: string): Promise<Category | null> {
		const productType = await this.prisma.category.findUnique({
			where: {
				name
			}
		})

		if (!productType) throw new NotFoundException('Product type not found!')
		return productType
	}

	async update(name: string, dto: CategoryDto): Promise<Category | null> {
		const productType = await this.prisma.category.update({
			where: { name },
			data: { ...dto }
		})

		if (!productType) throw new NotFoundException('Product type not found!')
		return productType
	}

	async remove(name: string): Promise<Category | null> {
		const productType = await this.prisma.category.delete({
			where: { name }
		})

		if (!productType) throw new NotFoundException('Product type not found!')
		return productType
	}
}
