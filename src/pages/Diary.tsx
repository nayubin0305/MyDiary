import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Header from "../component/Header";
import Button from "../component/Button";
import Viewer from "../component/Viewer";
import NotFound from "../component/NotFound";
import { getFormattedDate, setPageTitle } from "../util";

const Diary = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle(`감정 일기장 : ${id}번 일기`);
    }, [id]);

    const goBack = () => {
        navigate(-1);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    if (!data){
        return <NotFound />;
    } else {
        const {date, emotionId, content} = data;
        const title = `${getFormattedDate(new Date(date))} 기록`;
        return (
            <div>
                <Header title={title} leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>} rightChild={<Button text={"수정하기"} onClick={goEdit}/>}/>
                <Viewer content={content} emotionId={emotionId}/>
            </div>
        );
    }
};

export default Diary;