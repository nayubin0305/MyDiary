import emotion1 from "./img/emotion1.png";
import emotion2 from "./img/emotion2.png";
import emotion3 from "./img/emotion3.png";
import emotion4 from "./img/emotion4.png";
import emotion5 from "./img/emotion5.png";

export const getEmotionImgById = (emotionId: number | string): string | null => {
  const targetEmotionId = String(emotionId);
  switch (targetEmotionId) {
    case "1":
      return emotion1;
    case "2":
      return emotion2;
    case "3":
      return emotion3;
    case "4":
      return emotion4;
    case "5":
      return emotion5;
    default:
      return null;
  } 
}

export interface Emotion {
  id: number;
  name: string;
  img: string | null;
}

export const emotionList: Emotion[] = [
  {
    id: 1,
    name: "완전 좋음",
    img: getEmotionImgById(1),
  },
  {
    id: 2,
    name: "좋음",
    img: getEmotionImgById(2),
  },
  {
    id: 3,
    name: "그럭저럭",
    img: getEmotionImgById(3),
  },
  {
    id: 4,
    name: "나쁨",
    img: getEmotionImgById(4),
  },
  {
    id: 5,
    name: "끔찍함",
    img: getEmotionImgById(5),
  },
];

// 작성/수정 페이지 날짜 부분 yyyy-mm-dd
export const getFormattedDate = (targetDate: Date): string => {
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const date = String(targetDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
};

// Home 해당 월에 시작과 끝 계산
export const getMonthRangeByDate = (date: Date): { beginTimeStamp: number; endTimeStamp: number } => {
  const beginTimeStamp = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
  const endTimeStamp = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  return {beginTimeStamp, endTimeStamp};
};

// 각 페이지명 설정
export const setPageTitle = (title: string): void => {
  const titleElement = document.getElementsByTagName("title")[0];
  titleElement.innerText = title;
};
