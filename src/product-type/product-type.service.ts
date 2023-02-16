import { Injectable, NotFoundException } from '@nestjs/common'
import { ProductType } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'

@Injectable()
export class ProductTypeService {
	constructor(private prisma: PrismaService) {}
	async create(data: CreateOrUpdateProductTypeDto): Promise<ProductType> {
		return this.prisma.productType.create({ data })
	}

	async findAll(): Promise<ProductType[]> {
		return this.prisma.productType.findMany()
	}

	async findByName(name: string): Promise<ProductType | null> {
		const productType = await this.prisma.productType.findUnique({
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
	): Promise<ProductType | null> {
		const productType = await this.prisma.productType.update({
			where: { name },
			data
		})

		if (!productType) throw new NotFoundException('Product type not found!')
		return productType
	}

	async remove(name: string): Promise<ProductType | null> {
		const productType = await this.prisma.productType.delete({
			where: { name }
		})

		if (!productType) throw new NotFoundException('Product type not found!')
		return productType
	}
}
