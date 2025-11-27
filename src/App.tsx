import './App.css';
import PostItWall from './components/PostItWall'; // 곧 만들 파일입니다

function App() {
  return (
    <div className="App">
      {/* 여기에 우리가 만든 포스트잇 벽을 붙일 겁니다 */}
      <PostItWall />
    </div>
  );
}

export default App;
