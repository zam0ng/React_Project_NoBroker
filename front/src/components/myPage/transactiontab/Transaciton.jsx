import React from 'react'
import {Container,ResigterEstate,StateDiv,Selectstate} from './transactionstyled';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';
import TransList from './TransList';
const Transaciton = () => {
  const [isselect, setisselect] = useState("check");
  const getMycheck = async()=>{
    const data = await axios.get("http://localhost:8080/mypage/getMycheck",{
      withCredentials : true,
    })
    return data.data;
  }

  const {data: myCheckdata, isLoading: myCheckLoading, error : myCheckError} = useQuery('mycheck',getMycheck);

  // console.log(myCheckdata);



  if(myCheckLoading){
    return <div>로딩 중...</div>;
  }
  if(myCheckError){
    return <div>오류: {myCheckError.message}</div>;
  }
  

  
  const selectBtn=(el)=>{
    setisselect(el);
  }

  const filter =(el)=>{
    console.log("filter",el)
    if(el=="check"){
      return myCheckdata.map((item)=><TransList data={item}></TransList>)
    }
  }

  return (
    <Container>
      <ResigterEstate>
        <StateDiv onClick={()=>{selectBtn("check")}}>찜한 매물 ♥️</StateDiv>
        <StateDiv onClick={()=>{selectBtn("cancelList")}}>취소 된 내역 </StateDiv>

      </ResigterEstate>
      <Selectstate>
        {filter(isselect)}
      </Selectstate>
    </Container>
  )
}

export default Transaciton