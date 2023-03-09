import { Injectable, NotFoundException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/database/prisma.service'
import { slugify } from 'src/utils/slugify'
import { CategoryDto } from './dto/category.dto'
import { returnCategoryObject } from './return-object/return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CategoryDto): Promise<Category> {
		return this.prisma.category.create({
			data: { name: dto.name, slug: slugify(dto.name) }
		})
	}

	async findAll() {
		return this.prisma.category.findMany({ select: returnCategoryObject })
	}

	async findBySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Product type not found!')
		return category
	}

	async findById(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Product type not found!')
		return category
	}

	async update(id: number, dto: CategoryDto) {
		const category = await this.prisma.category.update({
			where: { id },
			data: { name: dto.name, slug: slugify(dto.name) }
		})

		if (!category) throw new NotFoundException('Product type not found!')
		return category
	}

	async remove(id: number): Promise<Category | null> {
		const category = await this.prisma.category.delete({
			where: { id }
		})

		if (!category) throw new NotFoundException('Product type not found!')
		return category
	}
}
