import { PickType } from '@nestjs/swagger';
import { PostsEntity } from '../entities/posts.entity';

/**
 * @code writer 김현균
 * @description 게시판 dto
 */
export class PostsDto extends PickType(PostsEntity, [
  'id',
  'title',
  'body',
  'createAt',
]) {
  constructor(postsEntity: PostsEntity) {
    super();
    this.id = postsEntity.id;
    this.title = postsEntity.title;
    this.body = postsEntity.body;
    this.createAt = postsEntity.createAt;
  }
}
