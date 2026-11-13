import "./Button.css";
import type { MouseEventHandler } from "react";

interface ButtonProps {
    text: string;
    type?: "positive" | "negative" | "default";
    className?: string;
    pressed?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({text, type = "default",className, pressed, onClick}: ButtonProps) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button type="button" className={["Button", `Button_${btnType}`, className].filter(Boolean).join(" ")} aria-pressed={pressed} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;