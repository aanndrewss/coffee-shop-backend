import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Category } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@Body() dto: CategoryDto): Promise<Category> {
		return this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	@Get('by-slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return this.categoryService.findBySlug(slug)
	}

	@Get(':id')
	@Auth()
	async findById(@Param('id') id: string) {
		return this.categoryService.findById(+id)
	}

	@Get()
	async findAll() {
		return this.categoryService.findAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	remove(@Param('id') id: string): Promise<Category | null> {
		return this.categoryService.remove(+id)
	}
}
