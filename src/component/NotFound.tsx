import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="NotFound">
            <p>존재하지 않는 일기입니다.</p>
            <Button text={"홈으로"} onClick={() => navigate("/", { replace: true })} />
        </div>
    );
};

export default NotFound;