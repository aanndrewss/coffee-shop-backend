import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateOrUpdateUserDto } from './dto/createOrUpdateUser.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() data: CreateOrUpdateUserDto): Promise<User> {
		return this.userService.create(data)
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User | null> {
		return this.userService.findOne(+id)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() data: CreateOrUpdateUserDto
	): Promise<User | null> {
		return this.userService.update(+id, data)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<User | null> {
		return this.userService.remove(+id)
	}
}
