import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/PostDetail.css'

interface Post {
  id: number;
  title: string;
  summary: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data))
        .catch((err) => console.error('投稿取得失敗:', err));
    }
  }, [id]);

  if (!post) return <p>読み込み中...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
    </div>
  );
};

export default PostDetail;
