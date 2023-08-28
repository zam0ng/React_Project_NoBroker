import React, { useEffect } from "react";
import {
  Container,
  Title,
  MulterBox,
  ImgAdd,
  FileInput,
  FileLabel,
  ImgBoxDiv,
  FileDiv,
} from "./imgstyeld";
import { useState } from "react";
// let temp2=[];
const ImgMulter = ({ temp, setTemp,temp2,setTemp2}) => {
  // ,temp2,seTemp2
  const [heightValue, setHeightValue] = useState("60px");
  const [cnt, setCnt] = useState(0);
  
  useEffect(() => {
    if (cnt > 7) {
      alert("사진은 7개까지만 등록 가능합니다1.");
      return;
    } else if (cnt == 0) {
      setHeightValue("60px");
    } else if (cnt > 4) {
      setHeightValue("493px");
    } else {
      setHeightValue("277px");
    }
  }, [cnt]);


  function loadImg(event) {
    let input = event.target;
    
    // setTemp2(prevTemp2 => [...prevTemp2, ...input.files]);
    
    
    if(cnt<7 && input.files.length <8 && cnt + input.files.length < 8){

      setTemp(prevTemp => [...prevTemp, ...input.files]);
      console.log(input.files.length);
      const imgContainer = document.getElementById("imgCotainer");
      // setCnt(cnt+ parseInt(input.files.length));
      setCnt(preCnt => preCnt +parseInt(input.files.length));
      
    if (input.files) {
      let reader;
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        reader = new FileReader();

        reader.onload = function (e) {
          let img = document.createElement("img");
          img.src = e.target.result;

          let deleteButton = document.createElement('button');
          let div = document.createElement('div');
          deleteButton.textContent ="X";

          // x 버튼 눌렀을 때
          deleteButton.onclick=()=>{  
            imgContainer.removeChild(div);
            deleteButton.parentNode.removeChild(deleteButton);
            setCnt((prevCnt) => prevCnt - 1);

            // // temp2에서 temp2의 요소의 이름과 file 이름과 같은 파일의 인덱스를 찾는다.
            // const idx = temp.findIndex(el => el.name === file.name);
            // // temp2 배열을 updatedTemp2 라는 곳에 복제한다.
            // const updatedTemp2 = [...temp];
            // // 복제한 updatedTemp2 배열에 찾은 인덱스의 요소를 1개 제거한다.
            // const ta = updatedTemp2.splice(idx, 1);
            // // setTemp2(updatedTemp2);
            // // 같지 않은 것만 필터한다. -> 같으면 뺀다.
            setTemp(prevTemp => prevTemp.filter(item => item.name !== file.name));
          }
          //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

          div.appendChild(img);
          div.appendChild(deleteButton);
          imgContainer.appendChild(div);
          input.value = "";
         
        };
        reader.readAsDataURL(file);
      }
    }
    }
    else{
      alert("사진은 7개까지만 등록 가능합니다2.");
    }
  }

  return (
    <Container height={heightValue}>
      <Title height={heightValue}>
        일반 사진<span>*</span>
      </Title>
      <MulterBox>
        {/* <ImgAdd> ➕ 사진 추가</ImgAdd> */}
        <form encType="multipart/form-data">
          <FileDiv>
            <FileLabel for="file">➕ 사진 추가</FileLabel>
            <FileInput
              onInput={loadImg}
              type="file"
              name="upload"
              id="file"
              multiple
            />
          </FileDiv>
          {/* <FileInput onClick={uploadBtn} type="submit"/> */}
          {/* <div onClick={uploadBtn} >업로드</div> */}

          <ImgBoxDiv id="imgCotainer"></ImgBoxDiv>
        </form>
        {/* <button onClick={uploadBtn}>업로드</button> */}
      </MulterBox>
    </Container>
  );
};

export default ImgMulter;
