import { Module } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { UserModule } from 'src/user/user.module'
import { StatisticsController } from './statistics.controller'
import { StatisticsService } from './statistics.service'

@Module({
	controllers: [StatisticsController],
	providers: [StatisticsService, PrismaService],
	imports: [UserModule]
})
export class StatisticsModule {}
