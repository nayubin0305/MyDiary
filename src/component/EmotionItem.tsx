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
        <label className={["EmotionItem", isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`].join(" ")}>
            <input type="radio" name="emotion" value={id} checked={isSelected} onClick={handleOnClick} />
            <img alt={`emotion${id}`} src={img ?? undefined}/>
            <span>{name}</span>
        </label>
    );
};

export default memo(EmotionItem);