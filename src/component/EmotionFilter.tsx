import "./EmotionFilter.css";
import { emotionList } from "../util";

interface EmotionFilterProps {
    counts: Record<number, number>;
    selectedId: number | null;
    onSelect: (id: number | null) => void;
}

const EmotionFilter = ({counts, selectedId, onSelect}: EmotionFilterProps) => {
    // 가장 많은 개수 0으로 나누지 않게 최소 1
    const max = Math.max(1, ...Object.values(counts));

    return (
        <div className="EmotionFilter">
            {emotionList.map((it) => {
                const isSelected = selectedId === it.id;
                const percent = (counts[it.id] / max) * 100;
      
                return (
                    <button key={it.id} type="button" aria-pressed={isSelected} className={`item item_${it.id} ${isSelected ? "on" : ""}`} onClick={() => onSelect(isSelected ? null : it.id)}>
                        <span className="count">{counts[it.id]}</span>
                        <span className="bar_area">
                            <span className="bar" style={{height: `${percent}%`}}></span>
                        </span>
                        <span className="label">{it.name}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default EmotionFilter;