import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
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
  @IsString({ message: 'title 은/는 문자열이여합니다.' })
  @IsNotEmpty({ message: 'title 은/는 필수항목입니다.' })
  @Length(1, 20, { message: 'title 은/는 20까지만 사용가능합니다.' })
  title;

  @IsString({ message: 'body 은/는 문자열이여합니다.' })
  @IsNotEmpty({ message: 'body 은/는 필수항목입니다.' })
  @Length(1, 200, {
    message: 'titbodyle 은/는 200까지만 사용가능합니다.',
  })
  body;

  @IsString({ message: 'password 은/는 문자열이여합니다.' })
  @IsNotEmpty({ message: 'password 은/는 필수항목입니다.' })
  @Matches('^(?=.*?[0-9]).{6,}$', '', {
    message: 'password 은/는 숫자를 포함한 6자리 이상이어야 합니다.',
  })
  password: string;

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
