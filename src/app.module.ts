import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { DatabaseModule } from './database/database.module'
import { FilesModule } from './files/files.module'
import { ProductModule } from './product/product.module'
import { ProductTypeModule } from './product-type/product-type.module';

@Module({
	imports: [
		ProductModule,
		DatabaseModule,
		FilesModule,
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		ProductTypeModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
