import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/createBoard.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  /**
   * @code writer 김현균
   * @description 게시판 글 작성
   *
   * @POST ("/board")
   *
   * @returns 201 - boardDto
   */
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 리스트
   *
   * @GET ("/board")
   *
   * @returns 200 - Array<BoardDto>
   */
  @Get()
  async readAll() {
    return await this.boardService.readAll();
  }
}
