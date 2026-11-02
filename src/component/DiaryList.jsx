import "./DiaryList.css";
import Button from "./Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const DiaryList = ({data}) => {
    // 정렬
    const [sortType, setSortType] = useState("latest"); //셀렉트박스
    const [sorteData, setSorteData] = useState([]); //리스트

    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSorteData(copyList);
    }, [data, sortType]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
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