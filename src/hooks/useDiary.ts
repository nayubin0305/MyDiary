import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import type { DiaryType } from "../types";

const useDiary = (id: string | undefined) => {
    const data = useContext(DiaryStateContext); // 데이터 가져오기
    const [diary, setDiary] = useState<DiaryType>(); // 저장할 공간 확보
    const navigate = useNavigate();

    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) { // id가 일치하면 저장
            setDiary(matchDiary);
        } else if(!diary) {
            alert("일기가 존재하지 않습니다.");
            navigate("/", {replace: true}); //다시 못돌아오게 하다
        }
    }, [id, data]); // 변경될 때 실행

    return diary;
};

export default useDiary;