import "./EmotionBarChart.css";
import { emotionList } from "../util";

interface EmotionBarChartProps {
    counts: Record<number, number>;
}

const EmotionBarChart = ({counts}: EmotionBarChartProps) => {
    // 가장 많은 개수 0으로 나누지 않게 최소 1
    const max = Math.max(1, ...Object.values(counts));

    return (
        <ul className="EmotionBarChart">
            {emotionList.map((it) => (
                <li key={it.id} className={`item item_${it.id}`} title={`${it.name} ${counts[it.id]}개`}>
                    <span className="count">{counts[it.id]}</span>
                    <span className="bar_area">
                        <span className="bar" style={{height: `${(counts[it.id] / max) * 100}%`}}></span>
                    </span>
                    <span className="label">{it.name}</span>
                </li>
            ))}
        </ul>
    );
}

export default EmotionBarChart;