import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PostsEntity } from '../entities/posts.entity';

/**
 * @code writer 김현균
 * @description 게시판 delete용 dto
 */
export class DeletePostsDto extends PickType(PostsEntity, ['password']) {
  @IsString({ message: 'password 은/는 문자열이여합니다.' })
  @IsNotEmpty({ message: 'password 은/는 필수항목입니다.' })
  @Matches('^(?=.*?[0-9]).{6,}$', '', {
    message: 'password 은/는 숫자를 포함한 6자리 이상이어야 합니다.',
  })
  password: string;
}
