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
      alert("사진 8개이상 등록 불가능");
      
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

    // input.files 값을 스프레드 연산자로 temp2에 재생성(값은 같지만 주소는 다름)/ 완전일치가 아님
    // 아래서 input 값을 비워도 upload할때는 input으로 하는게 아니고 temp2로 함.
    // temp2 = [...temp2, ...input.files];
    // setTemp(temp2);
    // // setTemp(prevTemp =>[...prevTemp, ...input.files]);
    // 매물을 또 등록할 때 이전에 등록한 매물의 사진이 쌓여서 초기화
    // temp2=[];
    setTemp2(prevTemp2 => [...prevTemp2, ...input.files]);
    setTemp(prevTemp => [...prevTemp, ...input.files]);

    setCnt(cnt+ parseInt(input.files.length));
    console.log(input.files);
    const imgContainer = document.getElementById("imgCotainer");
    
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

            // // let idx = newfiles.findIndex((el) => {
            // let idx = temp2.findIndex((el) => {
            //   console.log(el.name);
            //   return el.name == file.name;
            // });
            // // const updatedFileList = [...temp2];
            // // updatedFileList.splice(idx, 1);
            // // settemp2(updatedFileList);
            // // setTemp(updatedFileList);
            // temp2.splice(idx, 1);
            // setTemp(temp2);
            const idx = temp2.findIndex(el => el.name === file.name);
            const updatedTemp2 = [...temp2];
            updatedTemp2.splice(idx, 1);
            setTemp2(updatedTemp2);

            setTemp(prevTemp => prevTemp.filter(item => item.name !== file.name));
          }
          //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

          div.appendChild(img);
          div.appendChild(deleteButton);
          imgContainer.appendChild(div);
          input.value = "";
          // temp2=[];
          // console.log("비움sdfsdfsdfs",input.files)
          // console.log("비움sdfsdfsdfs",temp)
        };
        reader.readAsDataURL(file);
      }
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
