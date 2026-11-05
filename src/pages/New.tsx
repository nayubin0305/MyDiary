import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";
import type { EditorState } from "../types";

const New = () => {
    useEffect(() => {
        setPageTitle("감정 일기장 : 새 일기 쓰기");
    }, []);

    const {onCreate} = useContext(DiaryDispatchContext);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const onSubmit = (data: EditorState) => {
        const {date, content, emotionId} = data;
        onCreate(date, content, emotionId);
        navigate("/", {replace: true});
    };

    return (
        <div>
            <Header title={"새 일기 쓰기"} leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}/>
            <Editor onSubmit={onSubmit} />
        </div>
    );
}

export default New;