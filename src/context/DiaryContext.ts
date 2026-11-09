import { createContext } from "react";
import type { DiaryType } from "../types";

export interface DiaryDispatch {
  onCreate: (date: string, content: string, emotionId: number) => void;
  onUpdate: (targetId: number, date: string , content: string, emotionId: number) => void;
  onDelete: (targetId: number) => void;
}

// Props Drilling 방지 context 사용하기
export const DiaryStateContext = createContext<DiaryType[]>([]);
export const DiaryDispatchContext = createContext<DiaryDispatch>({
  onCreate: () => {}, 
  onUpdate: () => {},
  onDelete: () => {},
});