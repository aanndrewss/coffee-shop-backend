import { Injectable } from '@nestjs/common'
import { CreateOrUpdateRoleDto } from './dto/createOrUpdateRole.dto'

@Injectable()
export class RoleService {
	create(data: CreateOrUpdateRoleDto) {
		return 'This action adds a new role'
	}

	findAll() {
		return `This action returns all role`
	}

	findOne(id: number) {
		return `This action returns a #${id} role`
	}

	update(id: number, data: CreateOrUpdateRoleDto) {
		return `This action updates a #${id} role`
	}

	remove(id: number) {
		return `This action removes a #${id} role`
	}
}
