import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/database/prisma.service'
import { FilesService } from 'src/files/files.service'
import { RoleService } from 'src/role/role.service'
import { UserDto } from './dto/user.dto'
import { returnUserObject } from './return-object/return-user.object'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private roleService: RoleService,
		private fileService: FilesService
	) {}

	async create(dto: UserDto): Promise<User> {
		const role = await this.roleService.findByValue('Customer')
		const user = await this.prisma.user.create({
			data: {
				...dto,
				roles: {
					create: [
						{
							roleId: role.id
						}
					]
				}
			}
		})

		return user
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({ include: { roles: true } })
	}

	async findById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						slug: true,
						img: true
					}
				},
				...selectObject
			}
		})

		if (!user) throw new NotFoundException('User not found!')
		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { email } })

		return user
	}

	async update(
		id: number,
		dto: UserDto,
		avatarPath: Express.Multer.File
	): Promise<User | null> {
		const fileName = await this.fileService.createFile(avatarPath)
		const isSameUser = await this.findByEmail(dto.email)
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already in use')

		const user = await this.findById(id)

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				name: dto.name,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password,
				avatarPath: fileName
			}
		})
	}

	async toggleFavorites(productId: number, userId: number) {
		const user = await this.findById(userId)

		if (!user) throw new NotFoundException('User not found!')

		const isExists = user.favorites.some(product => product.id === productId)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: { id: productId }
				}
			}
		})

		return { message: 'success' }
	}

	async remove(id: number): Promise<User | null> {
		const user = await this.prisma.user.delete({ where: { id } })

		if (!user) throw new NotFoundException('User not found!')
		return user
	}
}
