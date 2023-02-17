import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { FilesModule } from './files/files.module'
import { ProductTypeModule } from './product-type/product-type.module'
import { ProductModule } from './product/product.module'
import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ProductModule,
		DatabaseModule,
		FilesModule,
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		ProductTypeModule,
		UserModule,
		RoleModule,
		AuthModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
