import { responseFormatter } from '../../../common/utils/responseFormatter.utils';
import { PostsDto } from '../dtos/posts.dto';

export class PostsAPIDocs {
  /**
   * @code writer 김현균
   * @description 게시판 api의 Swagger Docs
   */

  /**
   * create api
   */
  static CreateOperation() {
    return {
      summary: '게시판 글 작성',
      description:
        '비밀번호를 포함한 글을 게시합니다.' +
        '<br> - 위치로 날씨를 정보를 포함할 수 있습니다. (기본값은 서울입니다.)' +
        '<br> - 이모지를 사용할 수 있습니다.',
    };
  }
  static CreateCreatedResponse() {
    return {
      description: 'Created',
      type: responseFormatter(PostsDto),
    };
  }

  /**
   * read api
   */
  static ReadOperation() {
    return {
      summary: '게시판 글 리스트',
      description:
        '게시판의 글을 최신순으로 불러옵니다.' +
        '<br> - page, page-count로 Pagination을 사용할 수 있습니다.',
    };
  }
  static ReadOkResponse() {
    return {
      description: 'Ok',
      type: responseFormatter(PostsDto, true),
    };
  }

  /**
   * edit api
   */
  static EditOperation() {
    return {
      summary: '게시판 글 편집',
      description:
        '게시판의 글을 편집합니다.' +
        '<br> - password가 일치해야하며 제목, 본문을 수정 할 수 있습니다.',
    };
  }

  /**
   * delete api
   */
  static DeleteOperation() {
    return {
      summary: '게시판 글 삭제',
      description:
        '게시판의 글을 삭제합니다.' + '<br> - password가 일치해야합니다.',
    };
  }
}
