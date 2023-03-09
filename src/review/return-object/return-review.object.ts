import { Prisma } from '@prisma/client'
import { returnUserObject } from 'src/user/return-object/return-user.object'

export const returnReviewObject: Prisma.ReviewSelect = {
	user: {
		select: returnUserObject
	},
	createdAt: true,
	comment: true,
	rating: true,
	id: true
}
