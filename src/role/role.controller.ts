import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { CreateOrUpdateRoleDto } from './dto/createOrUpdateRole.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	create(@Body() data: CreateOrUpdateRoleDto) {
		return this.roleService.create(data)
	}

	@Get()
	findAll() {
		return this.roleService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.roleService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() data: CreateOrUpdateRoleDto) {
		return this.roleService.update(+id, data)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.roleService.remove(+id)
	}
}
