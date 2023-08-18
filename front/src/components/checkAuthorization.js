import axios from '../Axios';
import { useNavigate } from 'react-router-dom';

import { Detail } from "./index";
import Vote from "./votePage/Vote";

// 권한 확인
// const CheckAuthorization = ({element : Component, path}) => {
const CheckAuthorization = ({login, certificateUser}) => {
    // const nav = useNavigate();


    const getData = async () => {
        const { data } = await axios.get(`http://localhost:8080/vote/checkAuthorization`, {
            withCredentials: true
        });
        console.log("받아온 데이터", data);

        if (data.message && data.message == "권한 있음") {
            // console.log("Component", Component);
            return {isLogin : true, isCertificateUser : true};
            // return true;
            // if (path == "/vote") {
            //     return true
            // } else if (path = "/vote/:id") {
            //     // return
            // }
            // return <Component />;
        } else if (data.message && data.message == "권한 없음") {
            // window.alert("권한이 없습니다.");
            // return nav("/login");
            return {isLogin : true, isCertificateUser : false};

        } else {
            // window.alert("로그인 해주세요.");
            // return nav("/login");
            return {isLogin : false, isCertificateUser : false};
        }
        // return false;
    }


    try {
        if (login==null && certificateUser==null) {
        return getData();

        } else {
            return {isLogin : login, isCertificateUser : certificateUser};
        }



    } catch (error) {
        console.log(error)
    }

}

export default CheckAuthorization