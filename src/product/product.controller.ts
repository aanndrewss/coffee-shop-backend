import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async findAll(@Query() queryDto: GetAllProductDto) {
		return this.productService.findAll(queryDto)
	}

	@Get('similar/:id')
	async findSimilar(@Param('id') id: string) {
		return this.productService.findSimilar(+id)
	}

	@Get('by-slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return this.productService.findBySlug(slug)
	}

	@Get('by-category/:categorySlug')
	async findByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.findByCategory(categorySlug)
	}

	@Auth()
	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.productService.findById(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@UseInterceptors(FileInterceptor('img'))
	@Post()
	async create(
		@Body() dto: ProductDto,
		@UploadedFile() img: Express.Multer.File
	) {
		return this.productService.create(dto, img)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@UseInterceptors(FileInterceptor('img'))
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() dto: ProductDto,
		@UploadedFile()
		img: Express.Multer.File
	) {
		return this.productService.update(+id, dto, img)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.productService.remove(+id)
	}
}
