import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { FilesService } from 'src/files/files.service'
import { CreateOrUpdateProductDto } from './dto/createOrUpdateProduct.dto'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private fileService: FilesService
	) {}

	async findAll(): Promise<Product[]> {
		return this.prisma.product.findMany()
	}

	async findById(id: number): Promise<Product | null> {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			}
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async update(
		id: number,
		data: CreateOrUpdateProductDto,
		img: any
	): Promise<Product> {
		const fileName = await this.fileService.createFile(img)
		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				...data,
				img: fileName
			}
		})
	}

	async create(data: CreateOrUpdateProductDto, img: any): Promise<Product> {
		const fileName = await this.fileService.createFile(img)
		return this.prisma.product.create({
			data: {
				...data,
				img: fileName
			}
		})
	}

	async remove(id: number): Promise<Product> {
		return this.prisma.product.delete({
			where: { id }
		})
	}
}
