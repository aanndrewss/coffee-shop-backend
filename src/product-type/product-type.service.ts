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
		const type = await this.prisma.productType.findUnique({
			where: {
				name
			}
		})

		if (!type) throw new NotFoundException('Type not found!')
		return type
	}

	async update(
		name: string,
		data: CreateOrUpdateProductTypeDto
	): Promise<ProductType> {
		return this.prisma.productType.update({ where: { name }, data })
	}

	async remove(name: string): Promise<ProductType> {
		return this.prisma.productType.delete({ where: { name } })
	}
}
