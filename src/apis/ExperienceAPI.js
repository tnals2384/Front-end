// ExperienceAPI.js

// 경험 데이터 추가 API 요청 함수
export const addExperience = async (postId, newExperience) => {
    try {
      // createExperienceRequest 형식에 맞춤
      const createExperienceRequest = {
        title: newExperience.title,
        content: newExperience.content,
      };
      // formData에 추가
      const formData = new FormData();
      formData.append('createExperienceRequest', new Blob([JSON.stringify(createExperienceRequest)], { type: 'application/json' }));
  
      const response = await fetch(`/api/v1/posts/${postId}/experiences`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data.result;
    } catch (error) {
      console.error('경험 추가 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  
  // 경험 데이터 업데이트 API 요청 함수
  export const updateExperience = async (experienceId, updateExperience) => {
    try {
      // updateExperienceRequest 형식에 맞춤
      const updateExperienceRequest = {
        title: updateExperience.title,
        content: updateExperience.content,
      };
      // formData에 추가
      const formData = new FormData();
      formData.append('updateExperienceRequest', new Blob([JSON.stringify(updateExperienceRequest)], { type: 'application/json' }));
  
      const response = await fetch(`/api/v1/experiences/${experienceId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('경험 업데이트 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  
  // 경험 데이터 삭제 API 요청 함수
  export const deleteExperience = async (experienceId) => {
    try {
      const response = await fetch(`/api/v1/experiences/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('경험 삭제 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  