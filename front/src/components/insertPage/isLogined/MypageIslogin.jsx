import React, { useContext, useEffect } from 'react'
import { Global } from '../Insert'
import { useNavigate } from 'react-router-dom';
import { MypageGlobal } from '../../myPage/Mypage';
const MypageIslogin = () => {
    const navigate = useNavigate();
    const {MyPageUserInfo} = useContext(MypageGlobal);

    useEffect(()=>{
  
        if(MyPageUserInfo=="미로그인"){
    
          alert("로그인 해주세요222222");
          // 나중에 로그인 페이지로 바꿔야함.
          navigate('/list');
        }
    },[])
  
  return (
    <></>
  )
}

export default MypageIslogin
