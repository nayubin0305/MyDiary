import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import { useReducer, useRef, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { DiaryType } from "./types";
import { DiaryStateContext, DiaryDispatchContext, type DiaryDispatch } from "./context/DiaryContext";
import { ThemeContext, type Theme } from "./context/ThemeContext";

const STORAGE_KEY = "diary";
const THEME_KEY = "theme";

type Action =
  | { type: "CREATE"; data: DiaryType }
  | { type: "UPDATE"; data: DiaryType }
  | { type: "DELETE"; targetId: number };

function reducer(state: DiaryType[], action: Action): DiaryType[] {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) => String(it.id) === String(action.data.id) ? {...action.data} : it);
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    default: {
      return state;
    }
  }
}

// 저장된 일기 가져오기
function loadDiaries(key: string): DiaryType[]{
  const rawData = localStorage.getItem(key);
  if(!rawData) {
    return [];
  }
  try {
    const localData: DiaryType[] = JSON.parse(rawData);
    return localData.sort((a,b) => Number(b.id) - Number(a.id)); // id 내림차순
  } catch {
    return [];
  }
}

// 테마 선택
function loadTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  // 저장된 값이 없으면 OS 설정
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  // 일기 데이터
  const [data, dispatch] = useReducer(reducer, STORAGE_KEY, loadDiaries);
  const idRef = useRef(data.length > 0 ? Number(data[0].id) + 1 : 1); //기존 최대값 +1에서 새일기 시작

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // 테마
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  const onCreate: DiaryDispatch["onCreate"] = (date, content, emotionId) => { //추가
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };
  const onUpdate: DiaryDispatch["onUpdate"] = (targetId, date, content, emotionId) => { //수정
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };
  const onDelete: DiaryDispatch["onDelete"] = (targetId) => { //삭제
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;