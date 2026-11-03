import "./Viewer.css";
import type { Diary } from "../types";
import { emotionList } from "../util";

type ViewerProps = Pick<Diary, "content" | "emotionId">;

const Viewer = ({content, emotionId}: ViewerProps) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    console.log(emotionItem);

    if (!emotionItem) {
        return null;
    }

    return (
        <div className="Viewer">
            <section>
                <h4>오늘의 감정</h4>
                <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotionId}`].join(" ")}>
                    <img src={emotionItem.img ?? undefined} alt={emotionItem.name}/>
                    <div className="emotion_descript">{emotionItem.name}</div>
                </div>
            </section>
            <section>
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    );
}

export default Viewer;