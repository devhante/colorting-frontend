// 포스트잇 데이터 구조
export interface PostItData {
  id: number;
  imageUrl: string;
  message: string;
}

// 계산된 랜덤 배치 스타일
export interface RandomStyle {
  rotation: number; // 회전 각도 (deg)
  top: number; // 상단 위치 (%)
  left: number; // 좌측 위치 (%)
}
