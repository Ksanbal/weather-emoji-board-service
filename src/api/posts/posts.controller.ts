import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostsDto } from './dtos/createPosts.dto';
import { EditPostsDto } from './dtos/editPosts.dto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * @code writer 김현균
   * @description 게시판 글 작성
   *
   * @POST ("/posts")
   *
   * @returns 201 - PostsDto
   */
  @Post()
  async create(@Body() createPostDto: CreatePostsDto) {
    return await this.postsService.create(createPostDto);
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 리스트
   *
   * @GET ("/posts")
   *
   * @returns 200 - Array<PostsDto>
   */
  @Get()
  async readAll() {
    return await this.postsService.readAll();
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 수정
   *
   * @PATCH ("/posts")
   *
   * @returns 200
   */
  @Patch(':id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostsDto: EditPostsDto,
  ) {
    return await this.postsService.edit(id, editPostsDto);
  }
}
