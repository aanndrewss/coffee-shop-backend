import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { ProductType } from '@prisma/client'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'
import { ProductTypeService } from './product-type.service'

@Controller('product-type')
export class ProductTypeController {
	constructor(private readonly productTypeService: ProductTypeService) {}

	@Post()
	async create(
		@Body() data: CreateOrUpdateProductTypeDto
	): Promise<ProductType> {
		return this.productTypeService.create(data)
	}

	@Get()
	async findAll(): Promise<ProductType[]> {
		return this.productTypeService.findAll()
	}

	@Patch(':name')
	async update(
		@Param('name') name: string,
		@Body() data: CreateOrUpdateProductTypeDto
	): Promise<ProductType | null> {
		return this.productTypeService.update(name, data)
	}

	@Get(':name')
	async findOne(@Param('name') name: string): Promise<ProductType | null> {
		return this.productTypeService.findByName(name)
	}

	@Delete(':name')
	remove(@Param('name') name: string): Promise<ProductType | null> {
		return this.productTypeService.remove(name)
	}
}
