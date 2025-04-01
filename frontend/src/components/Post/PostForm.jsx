import { useState } from 'react';
import { postToFacebook } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const PostForm = ({properties, onSuccess}) => {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('fb_token');
      if (!token) {
        navigate('/');
        return;
      }

      if (!selectedProperty) {
        setError('Please select a property');
        return;
      }

      await postToFacebook({
        accessToken: token,
        propertyId: selectedProperty,
        isVideo
      });

      onSuccess();
    } catch (err) {
      setError('Error posting to Facebook. Please try again.');
      console.error('Posting error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Facebook Post</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="property">
            Select Property
          </label>
          <select
            id="property"
            className="w-full px-3 py-2 border rounded"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            required
          >
            <option value="">-- Select a property --</option>
            {properties.map((property) => (
              <option key={property.id} value={property.id}>
                {property.title} - {property.address}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isVideo"
            className="mr-2"
            checked={isVideo}
            onChange={(e) => setIsVideo(e.target.checked)}
          />
          <label htmlFor="isVideo">This is a video post</label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Posting...' : 'Post to Facebook'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;