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

let temp2 = [];
const ImgMulter = ({ temp, setTemp }) => {
  const [heightValue, setHeightValue] = useState("60px");
  const [cnt, setCnt] = useState(0);

  // function uploadBtn() {
  //   console.log("나 클릭", temp2)
  //   const form = new FormData();
  //   const files = temp2;

  //   for (let i = 0; i < files.length; i++) {
  //     form.append("upload", files[i]);
  //   }
  //   console.log("------------------------------- files",files)

  //   axios.post("http://localhost:8080/upload",form,{

  //         "Content-Type" : "multipart/form-data",
  //         withCredentials : true,
  //       }).then((e)=>{
  //         console.log(e);
  //         console.log("잘 전달됨.")
  //       }).catch((err)=>{
  //           console.log(err);
  //       })
  // }
  useEffect(() => {
    if (cnt > 7) {
      alert("사진 7개이상 등록 불가능");
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
    temp2 = [...temp2, ...input.files];
    setTemp(temp2);
    // 매물을 또 등록할 때 이전에 등록한 매물의 사진이 쌓여서 초기화
    temp2 = [];
    setCnt(cnt + parseInt(input.files.length));

    const imgContainer = document.getElementById("imgCotainer");
    if (input.files) {
      let reader;
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        reader = new FileReader();

        reader.onload = function (e) {
          let img = document.createElement("img");
          img.src = e.target.result;

          let deleteButton = document.createElement("button");
          let div = document.createElement("div");
          deleteButton.textContent = "X";
          deleteButton.style.cursor = "pointer";

          deleteButton.onclick = () => {
            imgContainer.removeChild(div);
            deleteButton.parentNode.removeChild(deleteButton);
            // console.log("111",deleteButton.parentNode)
            console.log("111", file.name);
            setCnt((prevCnt) => prevCnt - 1);

            let idx = temp2.findIndex((el) => {
              console.log(el.name);
              return el.name == file.name;
            });
            temp2.splice(idx, 1);
            console.log("temp222222", temp2);
            // temp2 = [...temp2, ...input.files];
          };
          div.appendChild(img);
          div.appendChild(deleteButton);
          imgContainer.appendChild(div);
          input.value = "";
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
