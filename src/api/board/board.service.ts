import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { BoardEntity } from './entities/board.entity';
import * as bcrypt from 'bcrypt';
import { BoardDto } from './dtos/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  /**
   * @code writer 김현균
   * @description 게시판 글 작성
   *
   * @param dto createBoardDto
   *
   * @returns boardDto
   */
  async create(createBoardDto: CreateBoardDto) {
    // [x] 비밀번호 암호화
    const { password } = createBoardDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // [x] 게시물 생성 및 반환
    const newBoard = this.boardRepository.create(createBoardDto);
    newBoard.password = hashedPassword;
    await newBoard.save();

    return new BoardDto(newBoard);
  }
}
