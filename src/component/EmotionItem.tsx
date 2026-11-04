import "./EmotionItem.css"
import { memo } from "react";
import type { Emotion } from "../util";

interface EmotionItemProps extends Emotion {
    onClick: (id: number) => void;
    isSelected: boolean;
}

const EmotionItem = ({id, img, name, onClick, isSelected}: EmotionItemProps) => {
    const handleOnClick = () => {
        onClick(id);
    };
    return (
        <div className={["EmotionItem", isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`].join(" ")} onClick={handleOnClick}>
            <img alt={`emotion${id}`} src={img ?? undefined}/>
            <span>{name}</span>
        </div>
    );
};

export default memo(EmotionItem);