import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { ProductTypeService } from './product-type.service'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'

@Controller('product-type')
export class ProductTypeController {
	constructor(private readonly productTypeService: ProductTypeService) {}

	@Post()
	create(@Body() data: CreateOrUpdateProductTypeDto) {
		return this.productTypeService.create(data)
	}

	@Get()
	findAll() {
		return this.productTypeService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productTypeService.findOne(+id)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productTypeService.remove(+id)
	}
}
