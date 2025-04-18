import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

interface Post {
  id: number;
  title: string;
  summary: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('投稿取得失敗:', err);
        setIsLoading(false); 
      });
  }, []);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>ブログ一覧</h1>

      <Link to="/create">
        <button>新規投稿</button>
      </Link>

      <ul>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link> 
              <Link to={`/edit/${post.id}`}>編集</Link>
            </li>
          ))
        ) : (
          <p>投稿がありません。</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
