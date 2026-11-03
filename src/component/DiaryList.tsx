import "./DiaryList.css";
import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import type { Diary } from "../types";

type SortType = "latest" | "oldest";

const sortOptionList: { value: SortType; name: string }[] = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

interface DiaryListProps {
    data: Diary[];
}

const DiaryList = ({data}: DiaryListProps) => {
    // 정렬
    const [sortType, setSortType] = useState<SortType>("latest"); //셀렉트박스
    const [sorteData, setSorteData] = useState<Diary[]>([]); //리스트

    useEffect(() => {
        const compare = (a: Diary, b: Diary) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList: Diary[] = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSorteData(copyList);
    }, [data, sortType]);

    const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value as SortType);
    };

    // 링크이동
    const navigate = useNavigate();
    const onClickNew = () => {
        navigate("/new");
    };

    return <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">
                <select value={sortType} onChange={onChangeSortType}>
                    {sortOptionList.map((it, idx) => (
                        <option key={idx} value={it.value} >
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
            {sorteData.map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    </div>
};

export default DiaryList;