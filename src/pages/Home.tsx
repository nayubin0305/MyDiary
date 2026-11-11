import { useState, useContext, useEffect, useMemo } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import DiaryList from "../component/DiaryList";
import SearchBar from "../component/SearchBar";
import { DiaryStateContext } from "../context/DiaryContext";
import { getMonthRangeByDate, setPageTitle } from "../util";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        setPageTitle("감정 일기장 : 홈");
    }, []);

    // 현재 달에 해당하는 일기만 노출 + 검색어
    const filteredData = useMemo(() => {
        const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
        const searchWord = keyword.trim().toLowerCase();

        return  data.filter((it) => 
            beginTimeStamp <= it.date && 
            it.date <= endTimeStamp &&
            it.content.toLowerCase().includes(searchWord)
        );
    }, [data, pivotDate, keyword]);

    // 월 이동
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    return (
        <div>
            <Header 
                title={headerTitle} 
                leftChild={
                    <Button text={"<"} onClick={onDecreaseMonth}/>
                }
                rightChild={
                    <Button text={">"} onClick={onIncreaseMonth}/>
                }
            />
            <SearchBar value={keyword} onChange={setKeyword} />
            <div>
                <DiaryList data={filteredData}/>
            </div>
        </div>
    );
};

export default Home;