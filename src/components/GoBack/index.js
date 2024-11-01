import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { Button } from "antd";

function GoBack() {
    const navigate = useNavigate();
    const data = getCookie();
    const handleGoBack = () => {
        navigate(-1);
    }
    return(
        <>
        <Button onClick={handleGoBack}>Trở lại</Button>
        </>
    )

}

export default GoBack;