import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { Patch } from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { Product } from '@prisma/client'
import { ProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	async findAll(): Promise<Product[]> {
		return this.productService.findAll()
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<Product | null> {
		return this.productService.findById(+id)
	}

	@Post()
	@UseInterceptors(FileInterceptor('img'))
	async create(@Body() dto: ProductDto, @UploadedFile() img): Promise<Product> {
		return this.productService.create(dto, img)
	}

	@Patch(':id')
	@UseInterceptors(FileInterceptor('img'))
	async update(
		@Param('id') id: string,
		@Body() dto: ProductDto,
		@UploadedFile()
		img
	): Promise<Product | null> {
		return this.productService.update(+id, dto, img)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Product | null> {
		return this.productService.remove(+id)
	}
}
