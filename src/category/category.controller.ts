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
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('product-type')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	async create(@Body() dto: CategoryDto): Promise<Category> {
		return this.categoryService.create(dto)
	}

	@Get()
	async findAll(): Promise<Category[]> {
		return this.categoryService.findAll()
	}

	@Patch(':name')
	async update(
		@Param('name') name: string,
		@Body() dto: CategoryDto
	): Promise<Category | null> {
		return this.categoryService.update(name, dto)
	}

	@Get(':name')
	async findOne(@Param('name') name: string): Promise<Category | null> {
		return this.categoryService.findByName(name)
	}

	@Delete(':name')
	remove(@Param('name') name: string): Promise<Category | null> {
		return this.categoryService.remove(name)
	}
}
