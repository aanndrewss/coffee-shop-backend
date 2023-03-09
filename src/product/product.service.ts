import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { FilesService } from 'src/files/files.service'
import { slugify } from 'src/utils/slugify'
import { ProductDto } from './dto/product.dto'

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

	async update(id: number, dto: ProductDto, img: any): Promise<Product | null> {
		const fileName = await this.fileService.createFile(img)
		const product = await this.prisma.product.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: slugify(dto.name),
				grams: dto.grams,
				price: dto.price,
				categoryId: dto.categoryId,
				img: fileName
			}
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async create(dto: ProductDto, img: any): Promise<Product> {
		const fileName = await this.fileService.createFile(img)
		return this.prisma.product.create({
			data: {
				name: dto.name,
				slug: slugify(dto.name),
				grams: +dto.grams,
				price: +dto.price,
				categoryId: +dto.categoryId,
				img: fileName
			}
		})
	}

	async remove(id: number): Promise<Product | null> {
		const product = await this.prisma.product.delete({
			where: { id }
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}
}
