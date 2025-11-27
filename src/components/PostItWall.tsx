import React, { useState } from 'react';
import './PostItWall.css';
import type { PostItData, RandomStyle } from './types';

// 사진 총 개수
const TOTAL_IMAGES = 30;

// 반복문으로 데이터 배열 생성
const POST_IT_DATA: PostItData[] = Array.from({ length: TOTAL_IMAGES }, (_, i) => ({
  id: i + 1,
  // 1.jpg, 2.jpg ... 순서대로 경로 생성
  imageUrl: `/images/${i + 1}.png`,
  message: `Guestbook ${i + 1}`, // 메시지는 화면에 안 나오니 아무거나
}));

const PostItWall: React.FC = () => {
  const [styles] = useState<RandomStyle[]>(() => {
    return POST_IT_DATA.map(() => ({
      rotation: Math.random() * 40 - 20,
      offsetX: Math.random() * 60 - 30,
      offsetY: Math.random() * 60 - 30,
    }));
  });

  return (
    <div className="wall-container">
      <h1 className="title">크로니클 방명록</h1>

      <div className="post-it-grid">
        {POST_IT_DATA.map((item, index) => (
          <div
            key={item.id}
            className="post-it-wrapper"
            // 랜덤 스타일을 인라인 스타일로 주입합니다.
            style={{
              transform: `
                rotate(${styles[index].rotation}deg) 
                translate(${styles[index].offsetX}px, ${styles[index].offsetY}px)
              `,
            }}
          >
            {/* 실제 포스트잇 디자인 */}
            <img src={item.imageUrl} alt="guestbook post-it" className="post-it-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItWall;
