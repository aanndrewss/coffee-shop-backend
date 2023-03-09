import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { ReviewDto } from './dto/review.dto'
import { returnReviewObject } from './return-object/return-review.object'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async create(userId: number, dto: ReviewDto, productId: number) {
		return this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async findAll() {
		return this.prisma.review.findMany({
			orderBy: { createdAt: 'desc' },
			select: returnReviewObject
		})
	}

	async getAverageValueByProductId(productId: number) {
		return this.prisma.review
			.aggregate({ where: { productId }, _avg: { rating: true } })
			.then(data => data._avg)
	}
}
