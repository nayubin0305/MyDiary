import { useState, useContext, useEffect } from "react";
import Header from "../component/Header";
import Button from "../component/Button";
import DiaryList from "../component/DiaryList";
import { DiaryStateContext } from "../App";
import { getMonthRangeByDate, setPageTitle } from "../util";
import type { DiaryType } from "../types";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState<DiaryType[]>([]);

    // 현재 달에 해당하는지
    useEffect(() => {
        setPageTitle("감정 일기장 : 홈");

        if (data.length >= 1) {
            const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it) => beginTimeStamp <= it.date && it.date <= endTimeStamp)
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    // 월 이동
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`

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
            <div>
                <DiaryList data={filteredData}/>
            </div>
        </div>
    );
};

export default Home;