import { ApiProperty } from '@nestjs/swagger';
import { CommonEntity } from '../../../common/entities/common-entity';
import { Column, Entity } from 'typeorm';

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
  password: string;
}
