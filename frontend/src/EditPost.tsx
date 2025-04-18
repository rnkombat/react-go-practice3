import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/EditPost.css';

interface Post {
  id: number;
  title: string;
  summary: string;
}

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setSummary(data.summary);
      })
      .catch((err) => console.error('投稿取得失敗:', err));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    fetch(`http://localhost:8080/api/posts/${post.id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, summary }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('更新失敗');
        return res.json(); 
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.error('更新エラー:', err));
  };

  if (!post) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>投稿を編集</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>概要:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  );
};

export default EditPost;
