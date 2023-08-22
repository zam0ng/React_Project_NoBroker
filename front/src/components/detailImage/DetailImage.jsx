import React, { useEffect, useState } from 'react'

import { DetailImg, BigDetailImg, ImgDiv, PopupBack, SmallImgDiv, ImgBtn } from './detailImageStyled'
import { serverUrl } from 'components/serverURL';

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
        setDisplay("flex");

        window.scrollTo(0,0);

        document.querySelector("#popupImg").src = document.querySelector(`#img_${idx}`).src;
        document.body.style.overflow = "hidden";
    }


    const loop = () => {
        let arr = [];
        list.forEach((el, index) => {
            arr.push(<DetailImg> <img id={`img_${index}`} onClick={(e)=>{thumbnailImg(e)}} src={el && el != "" ? `${serverUrl}estate_imgs/`+el.substr(12): `${serverUrl}estate_imgs/null.png`} /> </DetailImg>);
        });
        return arr;
    }

  return (
    <>
    <PopupBack display = {display} onClick={()=>{
        setDisplay("none");
        document.body.style.overflow = "auto";
        }}>
        {/* 닫기 버튼 */}
        {/* <span onClick={()=>{setDisplay("none")}}>X</span> */}
        <img id='popupImg' src="" alt="" />
    </PopupBack>

    <ImgDiv>
        {/* 이전 버튼 */}
        <ImgBtn onClick={prev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 33 32" style={{flex: "0 0 auto"}}><g fill="none" fill-rule="evenodd"><path fill="#FFF" fill-rule="nonzero" d="M20.132 7.646c.195-.195.512-.195.707 0 .173.174.193.443.058.638l-.058.07-8.133 8.131 8.133 8.132c.173.174.193.443.058.638l-.058.07c-.174.173-.443.192-.638.057l-.07-.058-8.838-8.839 8.839-8.839z" transform="translate(-416.000000, -524.000000) translate(400.000000, 508.000000) translate(16.139087, 16.000000)"></path></g></svg>
        </ImgBtn>

        <BigDetailImg onClick={bigImg}>
            <img id='bigImg' src="" alt="임시" />
            <div><p>{idx+1 + " / 7"}</p></div>
        </BigDetailImg>

        {/* 다음 버튼 */}
        <ImgBtn onClick={next}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 33 33" style={{flex: "0 0 auto"}}><g fill="none" fill-rule="evenodd"><path fill="#FFF" fill-rule="nonzero" d="M11.646 7.646c.174-.173.443-.192.638-.057l.07.057 8.838 8.84-8.838 8.838c-.196.195-.512.195-.708 0-.173-.173-.192-.443-.057-.638l.057-.069 8.132-8.132-8.132-8.131c-.173-.174-.192-.443-.057-.638l.057-.07z" transform="translate(-1472.000000, -524.000000) translate(1456.000000, 508.000000) translate(16.346194, 16.485281)"></path></g></svg>
        </ImgBtn>
    </ImgDiv>

    <SmallImgDiv><div>{loop()}</div></SmallImgDiv>
    </>
  )
}

export default DetailImage