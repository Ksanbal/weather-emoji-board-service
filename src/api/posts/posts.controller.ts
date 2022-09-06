import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostsDto } from './dtos/createPosts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
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
}
