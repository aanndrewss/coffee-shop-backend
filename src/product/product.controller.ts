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
import { CreateOrUpdateProductDto } from './dto/createOrUpdateProduct.dto'
import { ProductService } from './product.service'

@Controller('product')
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
	async create(
		@Body() data: CreateOrUpdateProductDto,
		@UploadedFile() img
	): Promise<Product> {
		return this.productService.create(data, img)
	}

	@Patch(':id')
	@UseInterceptors(FileInterceptor('img'))
	async update(
		@Param('id') id: string,
		@Body() data: CreateOrUpdateProductDto,
		@UploadedFile()
		img
	): Promise<Product> {
		return this.productService.update(+id, data, img)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.productService.remove(+id)
	}
}
