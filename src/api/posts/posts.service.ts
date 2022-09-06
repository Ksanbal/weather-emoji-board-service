import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostsDto } from './dtos/createPosts.dto';
import { PostsEntity } from './entities/posts.entity';
import * as bcrypt from 'bcrypt';
import { PostsDto } from './dtos/posts.dto';

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
   * @param
   *
   * @returns Array<PostsDto>
   */
  async readAll() {
    const posts = await this.postsRepository.find({
      order: { createAt: 'DESC' },
    });
    return posts.map((post) => new PostsDto(post));
  }
}
