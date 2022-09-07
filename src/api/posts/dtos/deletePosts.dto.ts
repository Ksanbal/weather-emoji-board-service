import { PickType } from '@nestjs/swagger';
import { PostsEntity } from '../entities/posts.entity';

/**
 * @code writer 김현균
 * @description 게시판 delete용 dto
 */
export class DeletePostsDto extends PickType(PostsEntity, ['password']) {}
