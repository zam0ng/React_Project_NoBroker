import React from 'react'
import {Container,ResigterEstate,StateDiv,Selectstate} from './transactionstyled';
// import axios from 'axios';
import axios from '../../../Axios'
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import TransList from './TransList';
const Transaciton = () => {
  const [isselect, setisselect] = useState("check");
  const [checkCnt, setcheckCnt] = useState(0);
  const [cancelCnt, setcancelCnt] = useState(0);
  const [btnname,setbtnname]= useState("");

  
  const getMycheck = async()=>{
    console.log("123123213")
    const data = await axios.get("/mypage/getMycheck",{
      withCredentials : true,
    })
    return data.data;
  }

  const getCancelList = async()=>{
    console.log("123123213")

    const data = await axios.get('/mypage/getCancelList',{
      withCredentials : true,
    })
    return data.data;
  }

  const {data: myCheckdata, isLoading: myCheckLoading, error : myCheckError} = useQuery('mycheck',getMycheck);
  // console.log(myCheckdata)
  const {data :cancelListdata, isLoading : cancelListLoading , error : cancelListError } = useQuery('cancelList',getCancelList)
  // console.log(cancelListdata);
  

  // useEffect(()=>{
  //   const newArr = [...cancelListdata.data,...cancelListdata.data2];
  //   console.log(newArr);
  // },[cancelListdata])

  useEffect(()=>{
    setcheckCnt(myCheckdata?.length);
    setcancelCnt(cancelListdata?.length);
  },[myCheckdata,cancelListdata])



  if(myCheckLoading || cancelListLoading ){
    return <div>로딩 중...</div>;
  }
  if(myCheckError){
    return <div>오류: {myCheckError.message}</div>;
  }
  if(cancelListError){
    return <div>오류: {myCheckError.message}</div>;
  }
  
  const selectBtn=(el)=>{
    setisselect(el);
  }

  const filter =(el)=>{
    if(el=="check"){

      return myCheckdata.map((item)=><TransList data={item} el={el}></TransList>)
    }
    else if(el=="cancelList"){
      return cancelListdata.map((item)=><TransList data={item} el={el}></TransList>)
    }
  }

  return (
    <Container>
      <ResigterEstate>
        <StateDiv isActive={isselect==="check"} onClick={()=>{selectBtn("check")}}>찜한 매물 🧡 <span>{checkCnt}</span></StateDiv>
        <StateDiv isActive={isselect==="cancelList"} onClick={()=>{selectBtn("cancelList")}}>취소된 내역 😭 <span>{cancelCnt}</span></StateDiv>

      </ResigterEstate>
      <Selectstate>
        {filter(isselect)}
      </Selectstate>
    </Container>
  )
}

export default Transaciton