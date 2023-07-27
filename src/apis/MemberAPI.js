import { useNavigate } from 'react-router-dom';

export const LogoutAPI = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/logout');
      navigate('/login');
    } catch (error) {
      console.error('로그아웃 요청 중 오류가 발생했습니다.', error);
    }
  };

  return { handleLogout };
};

export const DeleteMemberAPI = () => {
  const navigate = useNavigate();

  const deleteMember = async () => {
    try {
      await fetch('/members', { method: 'DELETE' });
      navigate('/login');
    } catch (error) {
      console.error('회원탈퇴 요청 중 오류가 발생했습니다.', error);
    }
  };

  return { deleteMember };
};
