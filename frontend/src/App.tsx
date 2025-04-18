import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import PostDetail from './PostDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetail />} /> {/* 投稿詳細ページ */}
      </Routes>
    </Router>
  );
}

export default App;
