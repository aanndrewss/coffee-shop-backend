import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Category } from '@prisma/client'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'
import { ProductTypeService } from './product-type.service'

@Controller('product-type')
export class ProductTypeController {
	constructor(private readonly productTypeService: ProductTypeService) {}

	@Post()
	async create(
		@Body() dto: CreateOrUpdateProductTypeDto
	): Promise<Category> {
		return this.productTypeService.create(dto)
	}

	@Get()
	async findAll(): Promise<Category[]> {
		return this.productTypeService.findAll()
	}

	@Patch(':name')
	async update(
		@Param('name') name: string,
		@Body() dto: CreateOrUpdateProductTypeDto
	): Promise<Category | null> {
		return this.productTypeService.update(name, dto)
	}

	@Get(':name')
	async findOne(@Param('name') name: string): Promise<Category | null> {
		return this.productTypeService.findByName(name)
	}

	@Delete(':name')
	remove(@Param('name') name: string): Promise<Category | null> {
		return this.productTypeService.remove(name)
	}
}
