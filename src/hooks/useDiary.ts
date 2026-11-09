import { useContext } from "react";
import { DiaryStateContext } from "../App";

const useDiary = (id: string | undefined) => {
    const data = useContext(DiaryStateContext); // 일기 데이터 가져오기
    
    return data.find((it) => String(it.id) === String(id)); // id 일치 데이터 찾기
};

export default useDiary;