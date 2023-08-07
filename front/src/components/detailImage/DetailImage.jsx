import React, { useEffect, useState } from 'react'

import { DetailImg, BigDetailImg, ImgDiv, PopupBack, SmallImgDiv } from './detailImageStyled'

const DetailImage = ({list}) => {
   // 최대 7개의 이미지

    const [idx, setIdx] = useState(0);
    const [display, setDisplay] = useState("none");

    // idx 값 변경되면 해당하는 인덱스의 이미지 띄워줌
    useEffect(() => {
        document.querySelector("#bigImg").src = document.querySelector(`#img_${idx}`).src
    }, [idx]);

    // 목록에서 이미지 클릭되면 실행되는 함수
    const thumbnailImg = (e) => {
        setIdx(Number(e.target.id.split('_')[1]));
    }

    // 이미지 다음 버튼
    const next = () => {
        // 만약 index가 6 미만이라면
        if (idx < 6) {
            setIdx(idx+1);
        }
    }

    // 이미지 이전 버튼
    const prev = () => {
        // 만약 index가 0 초과라면
        if (idx > 0){
            setIdx(idx-1);
        }
    }

    // 썸네일 이미지 클릭하면 팝업창으로 띄워주는 함수
    const bigImg = () => {
        console.log("썸네일 클릭");
        setDisplay("flex");

        document.querySelector("#popupImg").src = document.querySelector(`#img_${idx}`).src;
    }


    const loop = () => {
        let arr = [];
        list.forEach((el, index) => {
            let src = "";
            if(el!=null) {
                src = el;
                // arr.push(<DetailImg><img src={el} alt="매물 이미지" /></DetailImg>);
            } else {
                src = 'http://localhost:8080/estate_imgs/null.png';
                // arr.push(<DetailImg> <img id={`img_${index}`} onClick={(e)=>{thumbnailImg(e)}} src='http://localhost:8080/estate_imgs/null.png' /> </DetailImg>);
            }
            arr.push(<DetailImg> <img id={`img_${index}`} onClick={(e)=>{thumbnailImg(e)}} src={src} /> </DetailImg>);
        });
        return arr;
    }

  return (
    <>
    <PopupBack display = {display} onClick={()=>{setDisplay("none")}}>
        {/* 닫기 버튼 */}
        {/* <span onClick={()=>{setDisplay("none")}}>X</span> */}
        <img id='popupImg' src="" alt="" />
    </PopupBack>

    <ImgDiv>
    <button onClick={prev}>이전{idx}</button>
    <BigDetailImg onClick={bigImg}><img id='bigImg' src="" alt="임시" /></BigDetailImg>
    <button onClick={next}>다음</button>
    </ImgDiv>

    <SmallImgDiv><div>{loop()}</div></SmallImgDiv>
    </>
  )
}

export default DetailImage