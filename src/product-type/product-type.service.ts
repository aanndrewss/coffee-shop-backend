import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'

@Injectable()
export class ProductTypeService {
	constructor(private prisma: PrismaService) {}
	async create(data: CreateOrUpdateProductTypeDto): Promise<Category> {
		return this.prisma.category.create({ data })
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

	async update(
		name: string,
		data: CreateOrUpdateProductTypeDto
	): Promise<Category | null> {
		const productType = await this.prisma.category.update({
			where: { name },
			data
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
