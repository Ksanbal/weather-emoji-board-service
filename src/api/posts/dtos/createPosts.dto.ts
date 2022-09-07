import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { PostsEntity } from '../entities/posts.entity';

/**
 * @code writer 김현균
 * @description 게시판 create용 dto
 */
export class CreatePostsDto extends PickType(PostsEntity, [
  'title',
  'body',
  'password',
]) {
  @IsNotEmpty({ message: 'title 은/는 필수항목입니다.' })
  title;

  @IsNotEmpty({ message: 'body 은/는 필수항목입니다.' })
  body;

  @ApiProperty({
    example: '37.5666805,126.9784147',
    description: '사용자의 위도,경도 값입니다.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'coordinate 은/는 문자열이여합니다.' })
  @Matches('([0-9]{1,}[.][0-9]{1,}){1}[,]([0-9]{1,}[.][0-9]{1,}){1}', '', {
    message: 'coordinate 은/는 올바른 좌표형식(위도,경도)이어야 합니다.',
  })
  coordinate: string;
}
