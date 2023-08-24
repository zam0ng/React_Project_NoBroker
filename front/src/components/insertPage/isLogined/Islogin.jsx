import React, { useContext, useEffect } from 'react'
import { Global } from '../Insert'
import { useNavigate } from 'react-router-dom';

const Islogin = () => {
  const navigate = useNavigate();
  const {user} = useContext(Global);
  useEffect(()=>{
 
    if(user.ban==true){
      // alert 안하고 바로 로그인창도 가능
      alert("이전 등록하신 매물들이 3개 이상 허위매물로 분류되어 더이상 매물을 등록할 수 없습니다.")
      // 나중에 로그인으로 바꾸기
      navigate('/list')
    }  
  },[])
  

  return (
    <></>
  )
}

export default Islogin