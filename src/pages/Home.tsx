import { useState, useContext, useEffect, useMemo } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import DiaryList from "../component/DiaryList";
import SearchBar from "../component/SearchBar";
import { DiaryStateContext } from "../context/DiaryContext";
import { getMonthRangeByDate, setPageTitle } from "../util";
import ThemeToggle from "../component/ThemeToggle";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [keyword, setKeyword] = useState("");
    const searchWord = keyword.trim().toLowerCase();
    const isSearching = searchWord !== "";

    useEffect(() => {
        setPageTitle("감정 일기장 : 홈");
    }, []);

    // 현재 달에 해당하는 일기만 노출 + 검색어
    const filteredData = useMemo(() => {
        // 검색어가 있으면 전체 기간에서 필터
        if (searchWord !== "") {
            return data.filter((it) => it.content.toLowerCase().includes(searchWord));
        }

        // 검색어가 없으면 지금 달 필터
        const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);

        return  data.filter((it) => 
            beginTimeStamp <= it.date && 
            it.date <= endTimeStamp
        );
    }, [data, pivotDate, searchWord]);

    const emptyMessage = isSearching
        ? "검색 결과가 없습니다."
        : "이 달에 작성된 일기가 없습니다.";

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
            {isSearching && (<p className="search_info">전체 기간에서 검색 : {filteredData.length}건</p>)}
            <div>
                <DiaryList data={filteredData} emptyMessage={emptyMessage} />
            </div>
            <div className="theme_row">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Home;