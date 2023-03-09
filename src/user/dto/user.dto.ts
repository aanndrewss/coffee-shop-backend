import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
export class UserDto {
	@IsEmail()
	email: string

	@IsString()
	@IsOptional()
	name: string

	@IsString()
	@IsOptional()
	password: string

	@IsString()
	@IsOptional()
	phone: string
}
