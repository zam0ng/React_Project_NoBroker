import axios from 'axios';
import { Navigate } from 'react-router-dom';

// 권한 확인
const CheckAuthorization = async ({element : Component}) => {

    const { data } = await axios.get(`http://localhost:8080/vote/`, {
        withCredentials: true
    });
    console.log("받아온 데이터", data);

    // if (data.message && data.message == "권한 있음") {
    //     return <Component />;
    // } else if (data.message && data.message == "권한 없음") {
    //     // window.alert("권한이 없습니다.");
    //     return <Navigate to="/login" />;
    // } else {
    //     // window.alert("로그인 해주세요.");
    //     return <Navigate to="/login" />;
    // }

    return data.message && data.message == "권한 있음" ? (<Component />) : (data.message && data.message == "권한 없음" ? (<Navigate to="/login" />) : (<Navigate to="/login" />))

}

export default CheckAuthorization