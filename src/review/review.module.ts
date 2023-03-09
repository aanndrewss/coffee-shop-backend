import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ProductModule } from 'src/product/product.module'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService],
	imports: [ProductModule]
})
export class ReviewModule {}
