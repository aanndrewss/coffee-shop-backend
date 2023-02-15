import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ProductTypeController } from './product-type.controller'
import { ProductTypeService } from './product-type.service'

@Module({
	controllers: [ProductTypeController],
	providers: [ProductTypeService, PrismaService]
})
export class ProductTypeModule {}
