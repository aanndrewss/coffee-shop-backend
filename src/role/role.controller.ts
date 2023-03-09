import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { RoleDto } from './dto/role.dto'
import { RoleService } from './role.service'

@Controller('roles')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	async create(@Body() dto: RoleDto): Promise<Role> {
		return this.roleService.create(dto)
	}

	@Get()
	async findAll(): Promise<Role[]> {
		return this.roleService.findAll()
	}

	@Get(':value')
	async findByValue(@Param('value') value: string): Promise<Role | null> {
		return this.roleService.findByValue(value)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() dto: RoleDto
	): Promise<Role | null> {
		return this.roleService.update(+id, dto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Role | null> {
		return this.roleService.remove(+id)
	}
}
