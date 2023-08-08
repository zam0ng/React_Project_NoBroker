import React, { useEffect } from 'react'
import { Container, Title, MulterBox, ImgAdd,FileInput,FileLabel,
        ImgBoxDiv,FileDiv } from './imgstyeld';
import axios from 'axios';
import { useState } from 'react';

const ImgMulter = () => {
  const [heightValue,setHeightValue] =useState("60px");
  const [cnt,setCnt] =useState(0);
  
  function uploadBtn() {
    const form = new FormData();
    const files = document.querySelector("#file").files;
    console.log(files)
    for (let i = 0; i < files.length; i++) {
    form.append("uploadd", document.querySelector("#file").files[i]); 
    }

    axios.post("http://localhost:8080/upload",form,{

            "Content-Type" : "multipart/form-data",
            withCredentials : true
        }).then((e)=>{
          console.log(e);
          console.log("잘 전달됨.")
        }).catch((err)=>{
            console.log(err);
        })

  }
  useEffect(()=>{
    if(cnt > 7){
      alert("사진 7개이상 등록 불가능");
      return;
    }
    else if(cnt==0){
      setHeightValue("60px");
      
    }
    else if(cnt > 4){
      setHeightValue("493px");
    }
    else{
      setHeightValue("277px");
    }
  },[cnt])

  function loadImg(event) {
    let input = event.target;
    
    // cnt = cnt + parseInt(input.files.length);
    setCnt(cnt+ parseInt(input.files.length));
    
    const imgContainer = document.getElementById("imgCotainer");
    if(input.files){
      
      let reader
      for(let i=0 ; i < input.files.length ; i++){
      let file = input.files[i];
      reader = new FileReader();
        
        reader.onload = function (e) {
          let img = document.createElement('img');
          img.src = e.target.result;

          let deleteButton = document.createElement('button');
          let div = document.createElement('div');
          deleteButton.textContent ="X";

          deleteButton.onclick=()=>{
            imgContainer.removeChild(div);
            deleteButton.parentNode.removeChild(deleteButton);
            setCnt((prevCnt) => prevCnt-1);
          }
          div.appendChild(img);
          div.appendChild(deleteButton);
          imgContainer.appendChild(div);
          input.value = "";

        };
        reader.readAsDataURL(file);
      }

    }
  }

  return (
    <Container height={heightValue}>
        <Title height={heightValue}>일반 사진<span>*</span></Title>
        <MulterBox>
          {/* <ImgAdd> ➕ 사진 추가</ImgAdd> */}
          <form encType='multipart/form-data'>
            <FileDiv>
              <FileLabel for="file">➕ 사진 추가</FileLabel>
              <FileInput onInput={loadImg} type="file" name='uploadd' id='file' multiple/>
            </FileDiv> 
            {/* <FileInput onClick={uploadBtn} type="submit"/> */}
            {/* <button onClick={uploadBtn}>업로드</button> */}
            <ImgBoxDiv id="imgCotainer">
            </ImgBoxDiv>
          </form> 
        </MulterBox>

    </Container>  
  )
}

export default ImgMulter