import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async findAll(userId) {
		return this.prisma.order.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			}
		})
	}
}
