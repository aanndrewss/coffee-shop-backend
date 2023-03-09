import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { DatabaseModule } from './database/database.module'
import { FilesModule } from './files/files.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'
import { RoleModule } from './role/role.module'
import { StatisticsModule } from './statistics/statistics.module'
import { UserModule } from './user/user.module'
import { PaginationModule } from './pagination/pagination.module';

@Module({
	imports: [
		ProductModule,
		DatabaseModule,
		FilesModule,
		ConfigModule.forRoot(),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		CategoryModule,
		UserModule,
		RoleModule,
		AuthModule,
		ReviewModule,
		OrderModule,
		StatisticsModule,
		PaginationModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
