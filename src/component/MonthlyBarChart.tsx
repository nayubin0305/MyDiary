import "./MonthlyBarChart.css";

interface MonthlyItem {
    key: string;
    label: string;
    count: number;
}

interface MonthlyBarChartProps {
    items: MonthlyItem[];
}

const MonthlyBarChart = ({items}: MonthlyBarChartProps) => {
    // 가장 많은 개수 0으로 나누지 않게 최소 1
    const max = Math.max(1, ...items.map((it) => it.count));

    return (
        <div className="MonthlyBarChart">
            <h3>월별 일기 수 <span>(최근 {items.length}개월)</span></h3>
            <ul className="bars">
                {items.map((it) => (
                    <li key={it.key} className="item" title={`${it.label}: ${it.count}`}>
                        <span className="count">{it.count}</span>
                        <span className="bar_area">
                            <span className="bar" style={{height: `${(it.count / max) * 100}%`}}></span>
                        </span>
                        <span className="label">{it.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MonthlyBarChart;