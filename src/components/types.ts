// 포스트잇 데이터 인터페이스
export interface PostItData {
  id: number;
  imageUrl: string; // 원본 이미지 경로
  message: string; // 방명록 내용
}

// 각 포스트잇에 적용할 랜덤 스타일 인터페이스
// (위치나 각도를 JS에서 계산해서 저장해둘 공간입니다)
export interface RandomStyle {
  rotation: number; // 회전 각도 (deg)
  offsetX: number; // 좌우 약간의 이동 (px)
  offsetY: number; // 상하 약간의 이동 (px)
}
