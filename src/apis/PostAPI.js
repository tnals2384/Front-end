import axios from 'axios';

// 게시물 작성 API 요청
export const createPost = async (postData, experiences, selectedFiles) => {
  const tags = [
    {
      tagType: 'Job',
      tagName: postData.jobTags,
    },
    {
      tagType: 'Stack',
      tagName: postData.stackTags,
    },
    {
      tagType: 'Ability',
      tagName: postData.abilityTags,
    },
  ];

  const experiencesObj = {};
    experiences.forEach((experience) => {
    experiencesObj[experience.title] = experience.content;
  });

  const createPostRequest = {
    title: postData.title,
    beginAt: postData.startDate + "T12:00:00",
    finishAt: postData.endDate + "T12:00:00",
    tags: tags,
    experiences: experiencesObj,
  };

  const formData = new FormData();
  formData.append('createPostRequest', new Blob([JSON.stringify(createPostRequest)], { type: "application/json" }));

  selectedFiles.forEach((file, index) => {
    formData.append('file', file);
  });

  try {
    const response = await axios({
      method: 'post',
      url: '/api/v1/posts',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('create post 요청 중 오류가 발생했습니다.', error);
    throw error;
  }
};



// 포스트 목록을 가져오는 API 요청 함수
export const getPosts = async (currentPage, orderBy) => {
  try {
    const response = await fetch(`/api/v1/posts?page=${currentPage}&orderBy=${orderBy}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('포스트 데이터를 가져오는 동안 오류가 발생했습니다.', error);
    return null;
  }
};


// 게시물 데이터 조회 API 요청 함수
export const getPost = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`);
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('게시물 데이터를 가져오는 동안 오류가 발생했습니다.', error);
      return null;
    }
  };
  
  // 게시물 데이터 업데이트 API 요청 함수
  export const updatePost = async (postId, updatedData) => {
     //createTagRequest 형식에 맞춤
    const tags = [  
        {
            tagType: 'Job',
            tagName: updatedData.jobTags
        },
        {
            tagType: 'Stack',
            tagName: updatedData.stackTags
        },
        {
            tagType: 'Ability',
            tagName: updatedData.abilityTags
        }
    ];
    
    // 필드가 비어있는지 확인
    if (updatedData.startDate === '' || updatedData.endDate === '') {
        alert('기간을 선택해주세요.'); 
        return;
    }
    //updatePostRequst Dto 형식에 맞춤
    const updatePostRequest = {
        title : updatedData.title,
        beginAt : updatedData.startDate+"T12:00:00",
        finishAt : updatedData.endDate+"T12:00:00",
        tags : tags,
    }
    //formData에 추가
    const formData = new FormData();
    formData.append('updatePostRequest', new Blob([JSON.stringify(updatePostRequest)], {type: "application/json"}));
    
    try {
      
      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('게시물 업데이트 중 오류가 발생했습니다.', error);
      return null;
    }
  };


// 게시물 데이터 삭제 API 요청 함수
export const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('게시물 삭제 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  