// import axios from '../Axios';

// // 권한 확인
// const CheckAuthorization = ({login, certificateUser}) => {
// // const CheckAuthorization = () => {

//     const getData = async () => {
//         const { data } = await axios.get(`http://localhost:8080/vote/checkAuthorization`, {
//             withCredentials: true
//         });
//         console.log("CheckAuthorization : ", data);

//         if (data.message && data.message == "권한 있음") {
//             return {isLogin : "로그인", isCertificateUser : true};

//         } else if (data.message && data.message == "권한 없음") {
//             return {isLogin : "로그인", isCertificateUser : false};

//         } else {
//             return {isLogin : "로그인 X", isCertificateUser : false};
//         }
//     }

//     return getData();


//     // try {
//     //     if (login==null && certificateUser==null) {
//     //         return getData();

//     //     } else {
//     //         return {isLogin : login, isCertificateUser : certificateUser};
//     //     }

//     // } catch (error) {
//     //     console.log(error)
//     // }

// }

// export default CheckAuthorization