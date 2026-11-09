import { useContext , useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Editor from "../component/Editor";
import NotFound from "../component/NotFound";
import { DiaryDispatchContext } from "../App";
import { setPageTitle } from "../util";
import type { EditorState } from "../types";

const Edit = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);

    useEffect(() => {
        setPageTitle(`${id}번 일기 수정하기`);
    }, [id]);

    const goBack = () => {
        navigate(-1);
    };

    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
            onDelete(Number(id));
            navigate("/", {replace:true});
        }
    };
    const onSubmit = (editorState: EditorState) => {
        if (window.confirm("일기를 정말 수정할까요?")) {
            const {date, content, emotionId} = editorState;
            onUpdate(Number(id), date, content, emotionId);
            navigate("/", {replace: true});
        }
    };

    if(!data) {
        return <NotFound />;
    } else {
        return (
            <div>
                <Header title={"일기 수정하기"} leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />} rightChild={<Button text={"삭제하기"} type={"negative"} onClick={onClickDelete}/>}/>
                <Editor key={data.id} initData={data} onSubmit={onSubmit}/>
            </div>
        );
    }
};

export default Edit;