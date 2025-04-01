import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { facebookLogin } from '../../services/api';

const FacebookAuthButton = ({setIsAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleFacebookCallback(code);
    }
  }, []);

  const handleFacebookCallback = async (code) => {
    try {
      localStorage.setItem('fb_token', code);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const authUrl = await facebookLogin();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <span className="mr-2">Continue with Facebook</span>
      </button>
    </div>
  );
};

export default FacebookAuthButton;