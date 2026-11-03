import "./Header.css";
import type { ReactNode } from "react";

interface HeaderProps {
    title: string;
    leftChild?: ReactNode;
    rightChild?: ReactNode;
}

const Header = ({title, leftChild, rightChild}: HeaderProps) => {
    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">{rightChild}</div>
        </div>
    );
};

export default Header;