import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/return-object/return-category.object'
import { returnReviewObject } from 'src/review/return-object/return-review.object'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	price: true,
	grams: true,
	img: true,
	slug: true,
	description: true,
	createdAt: true
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: {
		select: returnReviewObject
	},
	category: { select: returnCategoryObject }
}
