import "./DiaryItem.css";
import { memo } from "react"; // 최적화
import { useNavigate, Link } from "react-router-dom";
import { emotionList, getEmotionImgById } from "../util";
import Button from "./Button";
import type { DiaryType } from "../types";

const DiaryItem = ({id, date, content, emotionId}: DiaryType) => {
    const navigate = useNavigate();
    const detailPath = `/diary/${id}`;

    const goDetail = () => {
        navigate(detailPath);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    // 감정 이름
    const emotionName = emotionList.find((e) => e.id === emotionId)?.name ?? "";

    return (
        <div className="DiaryItem">
            <div onClick={goDetail} className={["img_section", `img_section_${emotionId}`].join(" ")}>
                <img src={getEmotionImgById(emotionId) ?? undefined} alt={emotionName} />
            </div>
            <Link to={detailPath} className="info_section">
                <div className="date_wrapper">
                    {new Date(date).toLocaleDateString()}
                </div>
                <div className="content_wrapper">{content.slice(0,80)}</div>
            </Link>
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    );
};

export default memo(DiaryItem);