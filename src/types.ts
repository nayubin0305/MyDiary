export interface DiaryType { // 저장된 일기
  id: number;
  date: number;
  content: string;
  emotionId: number;
}

export interface EditorState { // 에디터 페이지 입력 시 일기
  date: string; // YYYY-MM-DD
  content: string;
  emotionId : number;
}