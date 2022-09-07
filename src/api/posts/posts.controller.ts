import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CommonResponse } from '../../common/responses/common.response';
import { PostsAPIDocs } from './docs/posts.docs';
import { CreatePostsDto } from './dtos/createPosts.dto';
import { DeletePostsDto } from './dtos/deletePosts.dto';
import { EditPostsDto } from './dtos/editPosts.dto';
import { PostsService } from './posts.service';

@ApiTags('게시판')
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
  @ApiOperation(PostsAPIDocs.CreateOperation())
  @ApiCreatedResponse(PostsAPIDocs.CreateCreatedResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
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
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'page-count', type: Number, required: false })
  @ApiOperation(PostsAPIDocs.ReadOperation())
  @ApiOkResponse(PostsAPIDocs.ReadOkResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  async readAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('page-count', ParseIntPipe) pageCount = 20,
  ) {
    return await this.postsService.readAll(page, pageCount);
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
  @ApiOperation(PostsAPIDocs.EditOperation())
  @ApiOkResponse(CommonResponse.OkResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @ApiConflictResponse(CommonResponse.ConflictException())
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostsDto: EditPostsDto,
  ) {
    return await this.postsService.edit(id, editPostsDto);
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 삭제
   *
   * @DELETE ("/api/posts/1")
   *
   * @returns 200
   */
  @Delete(':id')
  @ApiOperation(PostsAPIDocs.DeleteOperation())
  @ApiOkResponse(CommonResponse.OkResponse())
  @ApiBadRequestResponse(CommonResponse.BadRequestException())
  @ApiNotFoundResponse(CommonResponse.NotFoundException())
  @ApiConflictResponse(CommonResponse.ConflictException())
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Body() deletePostsDto: DeletePostsDto,
  ) {
    return await this.postsService.delete(id, deletePostsDto);
  }
}
