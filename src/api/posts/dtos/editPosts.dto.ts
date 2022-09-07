import { PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PostsEntity } from '../entities/posts.entity';

/**
 * @code writer 김현균
 * @description 게시판 edit용 dto
 */
export class EditPostsDto extends PickType(PostsEntity, [
  'title',
  'body',
  'password',
]) {
  @IsOptional()
  title;

  @IsOptional()
  body;
}
