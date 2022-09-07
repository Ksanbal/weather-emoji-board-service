import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '../../../common/entities/common-entity';
import { Column, Entity } from 'typeorm';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

/**
 * @code writer 작성자명
 * @description Example 모델 정의
 */
@Entity({
  name: 'posts',
})
export class PostsEntity extends CommonEntity {
  @ApiProperty({
    example: '제목입니다.',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 20,
    charset: 'utf8mb4',
    nullable: false,
    comment: '제목',
  })
  @IsString({ message: 'title 은/는 문자열이여합니다.' })
  @Length(1, 20, { message: 'title 은/는 20까지만 사용가능합니다.' })
  title: string;

  @ApiProperty({
    example: '본문입니다.',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 200,
    charset: 'utf8mb4',
    nullable: false,
    comment: '본문',
  })
  @IsString({ message: 'body 은/는 문자열이여합니다.' })
  @Length(1, 200, { message: 'body 은/는 20까지만 사용가능합니다.' })
  body: string;

  @ApiProperty({
    example: 'abcde1',
    description: '6자 이상(숫자 1개이상 포함)',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
    comment: '비밀번호',
  })
  @IsString({ message: 'password 은/는 문자열이여합니다.' })
  @IsNotEmpty({ message: 'password 은/는 필수항목입니다.' })
  @Matches('^(?=.*?[0-9]).{6,}$', '', {
    message: 'password 은/는 숫자를 포함한 6자리 이상이어야 합니다.',
  })
  password: string;

  @ApiProperty({
    example: '맑음',
    description: '날씨 정보',
    required: false,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '맑음',
  })
  weather: string;
}
