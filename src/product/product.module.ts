import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { FilesModule } from 'src/files/files.module'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService],
	imports: [FilesModule]
})
export class ProductModule {}
