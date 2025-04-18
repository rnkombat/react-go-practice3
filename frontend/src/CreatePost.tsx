import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreatePost.css';

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createPost = {
      title,
      summary,
    };

    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPost),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('投稿成功:', data);
        navigate('/');
      } else {
        console.error('投稿失敗');
      }
    } catch (error) {
      console.error('通信エラー:', error);
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>本文:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
};

export default CreatePost;
