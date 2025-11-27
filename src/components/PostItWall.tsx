import React, { useState } from 'react';
import './PostItWall.css';
import type { PostItData, RandomStyle } from './types';

const PHOTO_COUNT = 60;
const POST_IT_DATA: PostItData[] = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  id: i + 1,
  imageUrl: `/images/${(i % 30) + 1}.png`,
  message: `Guestbook ${i + 1}`,
}));

// 배치 관련 설정값
const MAX_WIDTH = 1800; // 기준 너비
const BASE_HEIGHT = 1850; // 기준 높이
const MIN_DISTANCE = 160; // 겹침 방지 최소 거리

// 포스트잇 크기 및 여백 설정 (px)
const POST_IT_SIZE_PX = 200;
const POST_IT_HALF_PX = POST_IT_SIZE_PX / 2;
const SAFE_MARGIN_X_PX = POST_IT_HALF_PX + 20; // 가로 잘림 방지 여백
const SAFE_MARGIN_TOP_PX = 150; // 상단 여백
const SAFE_MARGIN_BOTTOM_PX = 150; // 하단 여백

const PostItWall: React.FC = () => {
  const [layoutState] = useState<{ styles: RandomStyle[]; containerHeight: number }>(() => {
    // 현재 브라우저 너비 (최대폭 제한)
    const currentContainerWidth = Math.min(window.innerWidth, MAX_WIDTH);

    // 너비 변화에 따른 높이 자동 계산 (면적 보존)
    const totalArea = MAX_WIDTH * BASE_HEIGHT;
    const calculatedHeight = totalArea / currentContainerWidth;

    // px 단위 여백을 현재 크기 기준 %로 변환
    const safeMarginXPercent = (SAFE_MARGIN_X_PX / currentContainerWidth) * 100;
    const safeMarginTopPercent = (SAFE_MARGIN_TOP_PX / calculatedHeight) * 100;
    const safeMarginBottomPercent = (SAFE_MARGIN_BOTTOM_PX / calculatedHeight) * 100;
    const availableHeightPercent = 100 - safeMarginTopPercent - safeMarginBottomPercent;

    const createdStyles: RandomStyle[] = [];
    let failCount = 0;

    POST_IT_DATA.forEach(() => {
      let bestLeft = 0;
      let bestTop = 0;
      let validPositionFound = false;

      // 위치 선정 시도 (최대 500회)
      for (let attempt = 0; attempt < 500; attempt++) {
        // 안전 영역 내 랜덤 좌표 생성
        const randLeftPercent = safeMarginXPercent + Math.random() * (100 - safeMarginXPercent * 2);
        const randTopPercent = safeMarginTopPercent + Math.random() * availableHeightPercent;

        // 거리 계산을 위해 %를 px로 변환
        const randLeftPx = (randLeftPercent / 100) * currentContainerWidth;
        const randTopPx = (randTopPercent / 100) * calculatedHeight;

        // 기존 요소와 거리 확인 (충돌 체크)
        let isTooClose = false;
        for (const existing of createdStyles) {
          const existLeftPx = (existing.left / 100) * currentContainerWidth;
          const existTopPx = (existing.top / 100) * calculatedHeight;
          const dist = Math.sqrt(
            Math.pow(randLeftPx - existLeftPx, 2) + Math.pow(randTopPx - existTopPx, 2),
          );

          if (dist < MIN_DISTANCE) {
            isTooClose = true;
            break;
          }
        }

        if (!isTooClose) {
          bestLeft = randLeftPercent;
          bestTop = randTopPercent;
          validPositionFound = true;
          break;
        }
      }

      // 배치 실패 시 안전 영역 내 강제 할당
      if (!validPositionFound) {
        failCount++;
        bestLeft = safeMarginXPercent + Math.random() * (100 - safeMarginXPercent * 2);
        bestTop = safeMarginTopPercent + Math.random() * availableHeightPercent;
      }

      createdStyles.push({
        rotation: Math.random() * 20 - 10,
        left: bestLeft,
        top: bestTop,
      });
    });

    console.log(`[배치 결과] ${failCount}장 겹침 발생`);

    return {
      styles: createdStyles,
      containerHeight: calculatedHeight,
    };
  });

  return (
    <div className="wall-container">
      <h1 className="title">크로니클 방명록</h1>

      <div className="post-it-grid" style={{ height: `${layoutState.containerHeight}px` }}>
        {POST_IT_DATA.map((item, index) => (
          <div
            key={item.id}
            className="post-it-wrapper"
            style={{
              top: `${layoutState.styles[index].top}%`,
              left: `${layoutState.styles[index].left}%`,
              transform: `translate(-50%, -50%) rotate(${layoutState.styles[index].rotation}deg)`,
            }}
          >
            <img src={item.imageUrl} alt="guestbook" className="post-it-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostItWall;
