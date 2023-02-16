import { Injectable } from '@nestjs/common'
import { CreateOrUpdateUserDto } from './dto/createOrUpdateUser.dto'

@Injectable()
export class UserService {
	create(data: CreateOrUpdateUserDto) {
		return 'This action adds a new user'
	}

	findAll() {
		return `This action returns all user`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	update(id: number, data: CreateOrUpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
