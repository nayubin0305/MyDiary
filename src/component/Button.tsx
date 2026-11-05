import "./Button.css";
import type { MouseEventHandler } from "react";

interface ButtonProps {
    text: string;
    type?: "positive" | "negative" | "default";
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({text, type = "default", onClick}: ButtonProps) => {
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;