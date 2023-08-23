import React, { useContext, useEffect, useState } from 'react'
import {ResigterEstate,Container,StateDiv,Selectstate,SellDiv,BuyDiv,Test} from './registerstyled';
import RegisterList from './RegisterList';
import { MypageGlobal } from '../Mypage';
const Register = () => {
  const {getmyregisterinfo} =useContext(MypageGlobal);
  const [isselect, setIsselect] = useState("SELLAPP");
  const [cntArr,setcntArr]= useState([]);

  const selectbtn =(select) =>{
    setIsselect(select);
  }

  useEffect(()=>{
    let cnt;
    let cntArr=[];
    cnt = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.approved==0 && el.cancel==null && el.completed ==0);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.approved==1 && el.cancel==null && el.completed==0 );
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.completed==2);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data.filter((el)=>el.seller==getmyregisterinfo.user_id && el.cancel==getmyregisterinfo.user_id);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.approved==0 && el.cancel==null && el.completed ==0);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.approved==1 && el.cancel==null && el.completed==0);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.completed==2);
    cntArr.push(cnt.length);
    cnt = getmyregisterinfo.data.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.cancel==getmyregisterinfo.user_id);
    cntArr.push(cnt.length);
    setcntArr(cntArr);
  },[getmyregisterinfo.data])

  // console.log(cntArr);
    
  function infoFilter(select){
    let filterArr 
    // 판매승인 : seller : user_id / apporve : 0 / cancel : null / completed : 0  인경우
    if(select =="SELLAPP"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.approved==0 && el.cancel==null && el.completed ==0);
    }
    // 판매중 : seller : user_id / approve : 1 / cancel : null / completed : 0
    else if(select =="SELLING"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.approved==1 && el.cancel==null && el.completed==0 );
    }
    // 판매완료 : seller : user_id / completed : 1 /
    else if(select =="SELLCOM"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.seller==getmyregisterinfo.user_id && el.completed==2);
    }
    // 판매취소 : seller : user_id / cancel : user_id /
    else if(select =="SELLCAN"){
      filterArr = getmyregisterinfo.data.filter((el)=>el.seller==getmyregisterinfo.user_id && el.cancel==getmyregisterinfo.user_id);
    }
    // 승인대기 : buy: user_id /  approved :0 / cancel : null / completed : 0 /
    else if(select =="BUYAPP"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.approved==0 && el.cancel==null && el.completed ==0);
    }
    // 구매중 : buy : user_id / approve : 1 / cancel : null / completed : 0
    else if(select =="BUYING"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.approved==1 && el.cancel==null && el.completed==0);
    } 
    // 구매완료 : buy : user_id / completed: 1 /
    else if(select =="BUYCOM"){
      filterArr = getmyregisterinfo.data?.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.completed==2);
    }
    // 구매취소 : buy : user_id / cancel : user_id / 
    else if(select =="BUYCAN"){
      filterArr = getmyregisterinfo.data.filter((el)=>el.buyer==getmyregisterinfo.user_id && el.cancel==getmyregisterinfo.user_id);
      
    };
    return filterArr?.map((item)=><RegisterList data={item}></RegisterList>)
  }
  
  return (
    <Container>
      <ResigterEstate>
        <SellDiv>
          <StateDiv isActive ={isselect==="SELLAPP"} onClick={()=>{selectbtn("SELLAPP")}}>판매승인<span>{cntArr[0]}</span></StateDiv>
          <StateDiv isActive ={isselect==="SELLING"} onClick={()=>{selectbtn("SELLING")}}>판매중<span>{cntArr[1]}</span></StateDiv>
          <StateDiv isActive ={isselect==="SELLCOM"} onClick={()=>{selectbtn("SELLCOM")}}>판매완료<span>{cntArr[2]}</span></StateDiv>
          <StateDiv isActive ={isselect==="SELLCAN"} onClick={()=>{selectbtn("SELLCAN")}}>판매취소<span>{cntArr[3]}</span></StateDiv>
        </SellDiv>
        <BuyDiv>
          <StateDiv isActive ={isselect==="BUYAPP"} onClick={()=>{selectbtn("BUYAPP")}}>승인대기<span>{cntArr[4]}</span></StateDiv>
          <StateDiv isActive ={isselect==="BUYING"} onClick={()=>{selectbtn("BUYING")}}>구매중<span>{cntArr[5]}</span></StateDiv>
          <StateDiv isActive ={isselect==="BUYCOM"} onClick={()=>{selectbtn("BUYCOM")}}>구매완료<span>{cntArr[6]}</span></StateDiv>
          <StateDiv isActive ={isselect==="BUYCAN"} onClick={()=>{selectbtn("BUYCAN")}}>구매취소<span>{cntArr[7]}</span></StateDiv>
        </BuyDiv>

      </ResigterEstate>
      <Selectstate>
          {infoFilter(isselect)}       
      </Selectstate>
      

    </Container>
  )
}

export default Register