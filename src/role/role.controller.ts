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
import { CreateOrUpdateRoleDto } from './dto/createOrUpdateRole.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	async create(@Body() data: CreateOrUpdateRoleDto): Promise<Role> {
		return this.roleService.create(data)
	}

	@Get()
	async findAll(): Promise<Role[]> {
		return this.roleService.findAll()
	}

	@Get(':id')
	async findById(@Param('id') id: string): Promise<Role | null> {
		return this.roleService.findById(+id)
	}

	@Get(':value')
	async findByValue(@Param('value') value: string): Promise<Role | null> {
		return this.roleService.findByValue(value)
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() data: CreateOrUpdateRoleDto
	): Promise<Role | null> {
		return this.roleService.update(+id, data)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<Role | null> {
		return this.roleService.remove(+id)
	}
}
