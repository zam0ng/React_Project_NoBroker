import React, { useCallback, useContext, useEffect, useState } from 'react'
import List from './List'
import {Container,ResigterEstate,StateDiv,Selectstate} from './checkstyled'
import { MypageGlobal } from '../Mypage'
const Check = () => {
  const {MyPageUserInfo} = useContext(MypageGlobal);
  const [isSelect,setisSelect] = useState("ALL");
  // let cntArr= [];
  const [cntArr,setcntArr]= useState([]);
  
  const handlerBtn =(select)=>{
    setisSelect(select);
  }
  // 투표중, 정상등록, 허위판정, 투표미달 선택했을 때, 그에 해당하나는 accpet 만 필터로 걸러서
  // List 컴포넌트에 전달해 map 출력
  function filter(isSelect) {
    const filterArr = (num)=>MyPageUserInfo.filter(item => item.accpet === num);

    let finalfilter;
    if (isSelect == "VOTE") {
      finalfilter = filterArr(0);
    }
    else if (isSelect == "SELL") {
      finalfilter = filterArr(1);
    }
    else if (isSelect == "FAKE") {
      finalfilter = filterArr(2);
    }
    else if (isSelect == "FALL") {
      finalfilter = filterArr(3);    
    }
    else if (isSelect == "ALL") {
      finalfilter = MyPageUserInfo;
    }
    return finalfilter.map((item)=><List data={item}></List>)
  }
  
  useEffect(()=>{
    ;
      setcntArr([MyPageUserInfo.length])
    for (let index = 0; index < 4; index++) {
      
      const tb = (MyPageUserInfo.filter((item)=>item.accpet===index))
      console.log(tb.length)
        setcntArr(preValue => preValue.concat(tb.length));
        
    }
    console.log(cntArr)
  },[MyPageUserInfo])

  
  return (
    <Container>
      <ResigterEstate>
        <StateDiv isActive={isSelect==="ALL"} onClick ={()=>{handlerBtn("ALL")}} width={"25%"} br={"1px solid lightgray"}>등록한 매물<span>{cntArr[0]}</span></StateDiv>
        <StateDiv isActive={isSelect==="VOTE"} onClick ={()=>{handlerBtn("VOTE")}} color={"green"}>투표중<span> {cntArr[1]} </span></StateDiv>
        <StateDiv isActive={isSelect==="SELL"} onClick ={()=>{handlerBtn("SELL")}} color={"blue"}>정상등록<span> {cntArr[2]} </span></StateDiv>
        <StateDiv isActive={isSelect==="FAKE"} onClick ={()=>{handlerBtn("FAKE")}} color={"red"}>허위판정<span> {cntArr[3]} </span></StateDiv>
        <StateDiv isActive={isSelect==="FALL"} onClick ={()=>{handlerBtn("FALL")}} color={"gray"}>투표미달<span> {cntArr[4]} </span></StateDiv>

      </ResigterEstate>

      <Selectstate>
        {/* <List isArr={isArr}></List> */}
        {filter(isSelect)}
      </Selectstate>
    </Container>
  )
}

export default Check