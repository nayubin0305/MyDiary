import "./ThemeToggle.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="다크모드"
            className={`ThemeToggle ${isDark ? "is_dark" : ""}`}
            onClick={toggleTheme}
        >
            <span className="thumb" />
        </button>
    );
};

export default ThemeToggle;