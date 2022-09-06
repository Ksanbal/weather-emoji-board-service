import { PickType } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board.entity';

/**
 * @code writer 김현균
 * @description 게시판 dto
 */
export class BoardDto extends PickType(BoardEntity, [
  'id',
  'title',
  'body',
  'createAt',
]) {
  constructor(boardEntity: BoardEntity) {
    super();
    this.id = boardEntity.id;
    this.title = boardEntity.title;
    this.body = boardEntity.body;
    this.createAt = boardEntity.createAt;
  }
}
