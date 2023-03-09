import { Module } from '@nestjs/common'
import { CategoryService } from 'src/category/category.service'
import { PrismaService } from 'src/database/prisma.service'
import { FilesModule } from 'src/files/files.module'
import { PaginationService } from 'src/pagination/pagination.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	controllers: [ProductController],
	providers: [
		ProductService,
		PrismaService,
		PaginationService,
		CategoryService
	],
	imports: [FilesModule],
	exports: [ProductService]
})
export class ProductModule {}
