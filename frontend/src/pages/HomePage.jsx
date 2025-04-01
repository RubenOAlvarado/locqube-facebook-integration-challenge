import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacebookAuthButton from '../components/Auth/FacebookAuthButton';
import { checkAuthStatus } from '../services/api';

const HomePage = ({isAuthenticated, setIsAuthenticated}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('fb_token');
        if (token) {
          const status = await checkAuthStatus();
          if (status.authenticated) {
            setIsAuthenticated(true);
            navigate('/dashboard');
          } else {
            localStorage.removeItem('fb_token');
          }
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
      }
    };

    verifyAuth();
  }, [navigate, setIsAuthenticated]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Locqube Facebook Integration</h1>
          <p className="text-gray-600">
            Connect your Facebook account to share property listings
          </p>
        </div>

        <div className="space-y-4">
          <FacebookAuthButton setIsAuthenticated={setIsAuthenticated} />
          
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>By continuing, you agree to our Terms of Service</p>
            <p>and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;