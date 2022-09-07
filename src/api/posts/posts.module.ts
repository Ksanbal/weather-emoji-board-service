import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherModule } from '../../external_api/weather/weather.module';
import { PostsEntity } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity]), WeatherModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
