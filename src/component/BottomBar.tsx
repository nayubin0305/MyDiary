import "./BottomBar.css";
import ThemeToggle from "./ThemeToggle";
import { NavLink } from "react-router-dom";

const tabList = [
    {to: "/", label: "홈", end: true},
    {to: "/stats", label: "통계", end: false},
];

const BottomBar = () => {
    return (
        <nav className="BottomBar">
            <div className="tabs">
                {tabList.map((tab) => (
                    <NavLink key={tab.to} to={tab.to} end={tab.end} className="tab">
                        {tab.label}
                    </NavLink>
                ))}
            </div>
            <ThemeToggle />
        </nav>
    );
};

export default BottomBar;