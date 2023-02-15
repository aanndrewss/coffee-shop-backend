import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateOrUpdateProductTypeDto } from './dto/create-product-type.dto'

@Injectable()
export class ProductTypeService {
	constructor(private prisma: PrismaService) {}
	create(data: CreateOrUpdateProductTypeDto) {
		return this.prisma.type.create({ data })
	}

	findAll() {
		return `This action returns all productType`
	}

	findOne(id: number) {
		return `This action returns a #${id} productType`
	}

	update(id: number, dto: CreateOrUpdateProductTypeDto) {
		return `This action updates a #${id} productType`
	}

	remove(id: number) {
		return `This action removes a #${id} productType`
	}
}
