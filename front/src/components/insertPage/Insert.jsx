import React, { useEffect, useContext, createContext} from 'react'
import {MainTitle,Caution,Bodyy,EstataInfoTitle,WarningSpan,EssentialSpan,
        Modalbody,Modal,FinalCheck,CheckInput,CheckDiv,CheckContent,CheckBtn} from './insertstyled';
import Postcode from './postPopup/Post'
import TypeSelect from './estateTypeSelect/TypeSelect'
import Area from './estateArea/Area';
import EstateDoc from './estatedoc/EstateDoc'
import EstateBuilt from './estate_year_built/EstateBuilt'
import Deposite from './deposite/Deposite'
import ImgMulter from './imgMulter/ImgMulter';
import { useState } from 'react';
import Footer from '../footer/Footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export const Global = createContext();

const Insert = () => {
  const navigate = useNavigate();
  const [balance,setBalance] = useState(0);
  const [deposite,setDeposite] = useState(0);
  const [display,setDisplay] = useState("none");
  
  const[province,setProvince]= useState("");
  const[city,setCity]= useState("");
  const[town,setTown]= useState("");
  const[jibun,setJibun]= useState("");
  const[road,setRoad]= useState("");
  const[lng,setLng] =useState(0);
  const[lat,setLat] =useState(0);
  const[addiAddress,setaddiAddress] = useState("");
  const[m2,setM2] = useState("");
  const[uniqueNum,setUniqueNum] = useState("");
  const[selectValue,setSelectValue] = useState("1");
  const[temp,setTemp] = useState([]);
  const[year,setYear] = useState("");

  const obj = {
    lng,setLng,lat,setLat
  }
  function None() {
    setDisplay("none");
    document.body.style.overflow="visible";

  }
  function Block() {
    setDisplay("block");
    document.body.style.overflow="hidden";
  }
  
  async function btnClick (){
    console.log("매물등록 버튼 눌림");
    let seller = 1;
    console.log(province,city,town,jibun,road,lng,lat,addiAddress);
    console.log(balance,deposite,m2,uniqueNum);
    console.log(selectValue,year);

    const years = year.slice(0,4);

    const estateInfoArr = [seller,province,city,town,jibun,road,lng,lat,addiAddress,balance,deposite,m2,uniqueNum,selectValue,years]

    const notNull= estateInfoArr.filter((el) => !el);
    // console.log(notNull.length);
    if(notNull.length>0){
      alert("필수 입력 항목을 모두 입력해주세요.")
      return;
    }
    console.log("나 클릭", temp)
    const form = new FormData();
    const files = temp;
    
    for(const key in estateInfoArr){
      console.log(`key : ${key}, value : ${estateInfoArr[key]}`)
      form.append(`${key}`,`${estateInfoArr[key]}`)
    }
    for (let i = 0; i < files.length; i++) {
      form.append("upload", files[i]); 
    }
    console.log("------------------------------- files",files)

    axios.post("http://localhost:8080/upload",form,{
          
          "Content-Type" : "multipart/form-data",
          withCredentials : true,
        }).then((e)=>{
          console.log(e);
          console.log("잘 전달됨.")
        }).catch((err)=>{
            console.log(err);
        })
        navigate('/list')
  }
  function isChecked() {
    const checkbox = document.getElementById('checkbox');
    const ischecked = checkbox.checked;
    console.log(ischecked);

    const checkbtn = document.getElementById('checkbtn');

    if(ischecked){
      checkbtn.disabled = false;
      checkbtn.style.backgroundColor="#0067a3";
      checkbtn.style.color ="white";
      checkbtn.style.cursor = "pointer";
    }
    else{
      checkbtn.disabled = true;
      checkbtn.style.backgroundColor="#e0e0e0";
      checkbtn.style.color ="white";
      checkbtn.style.cursor = "default";
    }

  }
  return (
    <>
    <Global.Provider value={obj}>
    <Bodyy>
      <MainTitle>방내놓기</MainTitle>
      <Caution>
      <ul> 
        <li>주소를 다르게 입력할 경우 허위매물로 신고될 수 있으니 꼭 동일하게 입력 바랍니다.</li>
        <li>매물을 등록하면 투표가 진행되고 총 투표율이 70% 미만시 투표 미달로 분류되며 재등록이 가능합니다.</li>
        <li>총 투표율이 70% 이상시 과반수에 따라 정상, 허위 매물로 분류되며 허위매물로 분류시에 경고 1회 누적됩니다.</li>
      </ul>
      </Caution>
      <EstataInfoTitle>
        <div>매물 정보</div>
        <EssentialSpan>* 필수 입력</EssentialSpan>
      </EstataInfoTitle>

      <TypeSelect selectValue={selectValue} setSelectValue={setSelectValue} ></TypeSelect>
      <Postcode jibun={jibun} road={road} setProvince={setProvince} setCity={setCity} setTown={setTown}
       setJibun={setJibun} setRoad={setRoad} setaddiAddress={setaddiAddress}></Postcode>
      <Area setM2={setM2} m2={m2}></Area>
      <EstateDoc setUniqueNum={setUniqueNum}></EstateDoc>
      <EstateBuilt setYear={setYear}></EstateBuilt>
      
      <EstataInfoTitle>
        <div>거래 정보</div>
      </EstataInfoTitle>
      <Deposite setBalance={setBalance} setDeposite={setDeposite} deposite = {deposite}></Deposite>
      <EstataInfoTitle>
        <div>사진 등록</div>
        <WarningSpan onClick={Block}>* 사진 등록 전, 반드시 확인해주세요!</WarningSpan>
      </EstataInfoTitle>
      <ImgMulter temp={temp} setTemp={setTemp}></ImgMulter>

      <FinalCheck>
        <CheckDiv>
          <CheckInput onClick ={isChecked} type="checkbox" id="checkbox"></CheckInput>
          <CheckContent>매물관리규정을 확인하였으며, 입력한 정보는 실제 매물과 다름이 없습니다.</CheckContent>
        </CheckDiv>

        <CheckDiv height={"90px"}>
          <CheckBtn onClick={btnClick} id="checkbtn">매물 등록</CheckBtn>
        </CheckDiv> 
      </FinalCheck>
      <Footer></Footer>
    </Bodyy>
    </Global.Provider>

    <Modalbody display ={display}>
      <Modal>
        <h4>사진 등록전, 반드시 확인해주세요!</h4>
        <hr></hr>
        <h5>일반 사진</h5>
      <div>
        <p>1. 사진은 최대 7장까지 등록할 수 있습니다.</p>
        <p>2. 가로로 찍은 사진을 권장하며,</p> 
        <p>3. 사진 용량에 따라 시간이 지연될 수 있습니다.</p>
        <p>3. 해당 매물과 관련된 실 사진만 첨부 바랍니다.</p>
      </div>
      <button onClick={None}>닫기</button>
      </Modal>
    </Modalbody>

    
    </>
  )
}

export default Insert