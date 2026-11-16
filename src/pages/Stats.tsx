import "./Stats.css";
import { useEffect, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Button from "../component/Button";
import EmotionBarChart from "../component/EmotionBarChart";
import { setPageTitle, getMonthRangeByDate, countByEmotion, emotionList, countByMonth, getRecentMonths } from "../util";
import { DiaryStateContext } from "../context/DiaryContext";
import MonthlyBarChart from "../component/MonthlyBarChart";

type Period = "month" | "all";

const PeriodOptionList: {value: Period; name: string;}[] = [
    {value: "month", name: "이번달"},
    {value: "all", name: "전체"},
];

const Stats = () => {
    const data = useContext(DiaryStateContext); // 데이터
    const [period, setPeriod] = useState<Period>("month"); // 옵션
    const navigate = useNavigate();
    const [today] = useState(() => new Date());

    useEffect(() => {
        setPageTitle("감정 일기장 : 통계");
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    // 감정 옵션에 대한 필터 리스트
    const periodData = useMemo(() => {
        if (period === "all") {
            return data;
        }
        const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(today);
        return data.filter((it) => beginTimeStamp <= it.date && endTimeStamp >= it.date);
    }, [data, period, today]);

    // 해당 감정 개수
    const emotionCounts = useMemo(() => countByEmotion(periodData), [periodData]);

    // 요약 문구
    const total = periodData.length;
    const maxCount = Math.max(0, ...Object.values(emotionCounts));
    const topNames = emotionList // 가장 큰 개수인 감정
                    .filter((e) => emotionCounts[e.id] === maxCount)
                    .map((e) => e.name);
    const periodName = period === "month" ? "이번달" : "전체";
    const summary = total === 0 
                    ? "아직 기록된 일기가 없어요."
                    : `${periodName} 일기 ${total}개 - 가장 많은 감정은 ${topNames.join(", ")}` + (topNames.length > 1 ? `(각 ${maxCount}개)` : `(${maxCount}개)`);

    // 최근 6개월
    const monthlyItems = useMemo(() => {
        const counts = countByMonth(data);
        return getRecentMonths(today, 6).map((m) => ({
            key: m.key,
            label: m.label,
            count: counts[m.key] ?? 0,
        }));
    }, [data, today]);

    return(
        <div className="Stats">
            <Header title="통계" leftChild={<Button text={"뒤로 가기"} onClick={goBack} />} />
            <div className="period_toggle">
                {PeriodOptionList.map((it) => (
                    <Button key={it.value} text={it.name} aria-pressed={period === it.value ? "on" : ""} className={period === it.value ? "on" : ""} onClick={() => setPeriod(it.value)} />
                ))}
            </div>
            <EmotionBarChart counts={emotionCounts}/>
            <p className="summary">{summary}</p>
            <MonthlyBarChart items={monthlyItems}/>
        </div>       
    );
};

export default Stats;