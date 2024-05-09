import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const useAuth = (keys:string) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem(keys);
    if (auth) {
      navigate('/');
    }
  });

};

export default useAuth;
