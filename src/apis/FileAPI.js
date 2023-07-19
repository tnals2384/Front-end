
// 파일 업로드 API 요청 함수
export const uploadFiles = async (postId, selectedFiles) => {
    try {
      // formData에 추가
      const formData = new FormData();
      // 선택된 파일들을 formData에 리스트로 추가
      selectedFiles.forEach((file) => {
        formData.append('file', file);
      });
  
      const response = await fetch(`/api/v1/posts/${postId}/files`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data.result;
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  
  // 파일 삭제 API 요청 함수
  export const deleteFile = async (fileId) => {
    try {
      const response = await fetch(`/api/v1/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('파일 삭제 중 오류가 발생했습니다.', error);
      return null;
    }
  };
  
  // 파일 목록 가져오기 API 요청 함수
export const getFiles = async (postId) => {
    try {
      const response = await fetch(`/api/v1/posts/${postId}/files`);
      const data = await response.json();
      console.log(data);
      return data.result;
    } catch (error) {
      console.error('파일 목록을 가져오는 중 오류가 발생했습니다.', error);
      return null;
    }
};