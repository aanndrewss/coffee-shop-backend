import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'

@Module({
	controllers: [RoleController],
	providers: [RoleService, PrismaService],
	exports: [RoleService]
})
export class RoleModule {}
