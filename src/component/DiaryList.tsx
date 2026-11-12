import "./DiaryList.css";
import { useState, useMemo, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import type { DiaryType } from "../types";
import { emotionList } from "../util";

type SortType = "latest" | "oldest";

const sortOptionList: { value: SortType; name: string }[] = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
];

interface DiaryListProps {
    data: DiaryType[];
    emptyMessage?: string;
}

const DiaryList = ({data, emptyMessage = "작성된 일기가 없습니다."}: DiaryListProps) => {
    // 정렬 기준
    const [sortType, setSortType] = useState<SortType>("latest"); // 사용자가 조작하는 셀렉트박스
    // 감정 필터
    const [emotionFilter, setEmotionFilter] = useState("all");

    // 감정 필터 -> 정렬 순 적용
    const sortedData = useMemo(() => {
        const filtered = emotionFilter === "all"
            ? data
            : data.filter((it) => String(it.emotionId) === emotionFilter);

        const compare = (a: DiaryType, b: DiaryType) => {
            if (sortType === "latest") {
                return b.date - a.date;
            } else {
                return a.date - b.date;
            }
        };

        return [...filtered].sort(compare); // 복사본 정렬
    }, [data, sortType, emotionFilter]);

    const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value as SortType);
    };

    const onChangeEmotionFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        setEmotionFilter(e.target.value);
    }

    // 링크이동
    const navigate = useNavigate();
    const onClickNew = () => {
        navigate("/new");
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <select name="sortType" value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it) => (
                            <option key={it.value} value={it.value} >
                                {it.name}
                            </option>
                        ))}
                    </select>
                    <select name="emotionFilter" value={emotionFilter} onChange={onChangeEmotionFilter}>
                        <option value="all">전체 감정</option>
                        {emotionList.map((it) => (
                            <option key={it.id} value={it.id}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="right_col">
                    <Button type={"positive"} text={"새 일기 쓰기"} onClick={onClickNew}/>
                </div>
            </div>
            <div className="list_wrapper">
                {sortedData.length === 0 ? (
                    <p className="noneData">
                        {emotionFilter !== "all" ? "조건에 맞는 일기가 존재하지 않아요." : emptyMessage}
                    </p>
                ) : (                    
                    sortedData.map((it) => (
                        <DiaryItem key={it.id} {...it}/>
                    ))
                )}
            </div>
        </div>
    );
};

export default DiaryList;