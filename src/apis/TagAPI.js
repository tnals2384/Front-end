import axios from 'axios';

// 태그별 포스트 목록을 가져오는 API 요청 함수
export const getTagPosts = async (selectedTags, currentPage) => {
    try {
      const params = selectedTags.map((tag) => `tag=${encodeURIComponent(tag)}`);
      const query = params.join('&');
      const url = `/api/v1/posts/tag?${query}&page=${currentPage}`;
      const response = await axios.get(url);
      return response.data.result;
    } catch (error) {
      console.error('태그별 포스트 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      return null;
    }
  };