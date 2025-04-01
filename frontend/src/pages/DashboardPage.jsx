import { useState, useEffect } from 'react';
import PostForm from '../components/Post/PostForm';
import PostSuccess from '../components/Post/PostSuccess';
import { getProperties } from '../services/api';

const DashboardPage = () => {
  const [postSuccess, setPostSuccess] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to load properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading properties...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Facebook Integration Dashboard</h1>
      
      {postSuccess ? (
        <PostSuccess onNewPost={() => setPostSuccess(false)} />
      ) : (
        <PostForm 
          properties={properties} 
          onSuccess={() => setPostSuccess(true)} 
        />
      )}
    </div>
  );
};

export default DashboardPage;