import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, Product } from '@prisma/client'
import { CategoryService } from 'src/category/category.service'
import { PrismaService } from 'src/database/prisma.service'
import { FilesService } from 'src/files/files.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { slugify } from 'src/utils/slugify'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import {
	returnProductObject,
	returnProductObjectFullest
} from './return-object/return-product.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private fileService: FilesService,
		private paginationService: PaginationService,
		private categoryService: CategoryService
	) {}

	async findAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE) prismaSort.push({ price: 'asc' })
		else if (sort === EnumProductSort.HIGH_PRICE)
			prismaSort.push({ price: 'desc' })
		else if (sort === EnumProductSort.OLDEST)
			prismaSort.push({ createdAt: 'asc' })
		else prismaSort.push({ createdAt: 'desc' })

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
			  }
			: {}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: prismaSearchTermFilter
			})
		}
	}

	async findSimilar(id: number) {
		const currentProduct = await this.findById(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		const products = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: returnProductObject
		})

		return products
	}

	async findById(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async findBySlug(slug: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				slug
			},
			select: returnProductObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async findByCategory(categorySlug: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObjectFullest
		})

		if (!products) throw new NotFoundException('Products not found!')
		return products
	}

	async update(
		id: number,
		dto: ProductDto,
		img: Express.Multer.File
	): Promise<Product | null> {
		const fileName = await this.fileService.createFile(img)
		const product = await this.prisma.product.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slug: slugify(dto.name),
				grams: +dto.grams,
				price: +dto.price,
				description: dto.description,
				categoryId: +dto.categoryId,
				img: fileName
			}
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async create(dto: ProductDto, img: Express.Multer.File): Promise<Product> {
		const fileName = await this.fileService.createFile(img)
		const category = await this.categoryService.findById(+dto.categoryId)

		if (!category) throw new NotFoundException('Category not found!')

		return this.prisma.product.create({
			data: {
				name: dto.name,
				slug: slugify(dto.name),
				grams: +dto.grams,
				price: +dto.price,
				description: dto.description,
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
