import { useNavigate } from 'react-router-dom';

const Header = ({isAuthenticated, setIsAuthenticated}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('fb_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Locqube Facebook Integration</h1>
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;