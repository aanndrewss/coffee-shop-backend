import { IsString } from 'class-validator'

export class ProductDto {
	@IsString()
	name: string

	@IsString()
	price: string

	@IsString()
	grams: string

	@IsString()
	categoryId: string
}
