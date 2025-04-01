import { useNavigate } from 'react-router-dom';

const PostSuccess = ({onNewPost}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      <div className="text-green-500 text-5xl mb-4">✓</div>
      <h2 className="text-xl font-semibold mb-2">Post Successful!</h2>
      <p className="mb-6">Your property has been successfully posted to Facebook.</p>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onNewPost}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Post
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default PostSuccess;