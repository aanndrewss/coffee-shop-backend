import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() dto: UserDto): Promise<User> {
		return this.userService.create(dto)
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.findById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@UseInterceptors(FileInterceptor('avatarPath'))
	@Put('profile')
	async update(
		@CurrentUser('id') id: number,
		@Body() dto: UserDto,
		@UploadedFile() avatarPath: Express.Multer.File
	): Promise<User | null> {
		return this.userService.update(id, dto, avatarPath)
	}

	@Auth()
	@HttpCode(200)
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@Param('productId') productId: string,
		@CurrentUser('id') id: number
	) {
		return this.userService.toggleFavorites(id, +productId)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<User | null> {
		return this.userService.remove(+id)
	}
}
