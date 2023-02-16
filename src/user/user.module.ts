import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { RoleModule } from 'src/role/role.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService],
	imports: [RoleModule]
})
export class UserModule {}
