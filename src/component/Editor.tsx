import "./Editor.css";
import { useState, useCallback, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, emotionList } from "../util";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import type { DiaryType, EditorState } from "../types";

interface EditorProps {
    initData?: DiaryType;
    onSubmit: (data: EditorState) => void; // state를 부모에게 전달
}

const Editor = ({initData, onSubmit}: EditorProps) => {
    const navigate = useNavigate();

    // 초기값
    const [state, setState] = useState<EditorState>(() => {
        if(initData) {
            // 수정 모드
            return {
                date: getFormattedDate(new Date(initData.date)),
                content: initData.content,
                emotionId: initData.emotionId,
            };
        } else {
            // 새 일기
            return {
                date: getFormattedDate(new Date()),
                content: "",
                emotionId: 3,
            };
        }
    });

    const handleChangeDate = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };
    const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };
    const handleSubmit = () => {
        onSubmit(state);
    };
    const handleOnGoBack = () => {
        navigate(-1);
    };
    const handleChangeEmotion = useCallback((emotionId: number) => {
        setState((prev) => ({
            ...prev,
            emotionId,
        }));
    }, []);

    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate}/>
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem key={it.id} {...it} onClick={handleChangeEmotion} isSelected={state.emotionId === it.id}/>
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea placeholder="오늘은 어땠나요?" value={state.content} onChange={handleChangeContent}/>
                </div>
            </div>
            <div className="editor_section bottom_section">
                <Button text={"취소하기"} onClick={handleOnGoBack}/>
                <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default Editor;