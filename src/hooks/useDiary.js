import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data = useContext(DiaryStateContext); // 데이터 가져오기
    const [diary, setDiary] = useState(); // 저장할 공간 확보
    const navigate = useNavigate();

    useEffect(() => {
        if (data.length === 0) return; // 따로 추가, 삭제 후 알럿 안 뜨게

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