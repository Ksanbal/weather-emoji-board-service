import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dtos/createPosts.dto';
import { PostsEntity } from './entities/posts.entity';
import * as bcrypt from 'bcrypt';
import { PostsDto } from './dtos/posts.dto';
import { EditPostsDto } from './dtos/editPosts.dto';
import { DeletePostsDto } from './dtos/deletePosts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  /**
   * @code writer 김현균
   * @description 게시판 글 작성
   *
   * @param dto createPostsDto
   *
   * @returns PostsDto
   */
  async create(createPostsDto: CreatePostsDto) {
    // [x] 비밀번호 암호화
    const { password } = createPostsDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // [x] 게시물 생성 및 반환
    const newPost = this.postsRepository.create(createPostsDto);
    newPost.password = hashedPassword;
    await newPost.save();

    return new PostsDto(newPost);
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 리스트
   *
   * @param page 페이지
   * @param pageCount 페이지당 개수
   *
   * @returns Array<PostsDto>
   */
  async readAll(page = 1, pageCount = 20) {
    const posts = await this.postsRepository.find({
      take: pageCount,
      skip: pageCount * (page - 1),
      order: { createAt: 'DESC' },
    });
    return posts.map((post) => new PostsDto(post));
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 수정
   *
   * @param id number
   * @param editPostsDto EditPostsDto
   *
   * @returns null
   */
  async edit(id: number, editPostsDto: EditPostsDto) {
    // [x] 게시물 404 예외처리
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post)
      throw new HttpException(
        '게시물을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );

    // [x] 비밀번호 검증
    const { password } = editPostsDto;
    const isValid = await bcrypt.compare(password, post.password);
    if (!isValid)
      throw new HttpException('비밀번호를 확인해주세요.', HttpStatus.FORBIDDEN);

    // [x] 게시물 수정
    const { title, body } = editPostsDto;
    const test = await this.postsRepository.update(id, {
      title,
      body,
    });
    if (!test.affected)
      throw new HttpException(
        '게시물을 수정할 수 없습니다.',
        HttpStatus.CONFLICT,
      );
  }

  /**
   * @code writer 김현균
   * @description 게시판 글 삭제
   *
   * @param id number
   * @param deletePostsDto DeletePostsDto
   *
   * @returns null
   */
  async delete(id: number, deletePostsDto: DeletePostsDto) {
    // [x] 게시물 404 예외처리
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post)
      throw new HttpException(
        '게시물을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );

    // [x] 비밀번호 검증
    const { password } = deletePostsDto;
    const isValid = await bcrypt.compare(password, post.password);
    if (!isValid)
      throw new HttpException('비밀번호를 확인해주세요.', HttpStatus.FORBIDDEN);

    // [x] 게시물 삭제
    const result = await this.postsRepository.softDelete(id);
    if (!result.affected)
      throw new HttpException(
        '게시물을 삭제할 수 없습니다.',
        HttpStatus.CONFLICT,
      );
  }
}
