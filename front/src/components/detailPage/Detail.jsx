import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';

import DetailImage from '../detailImage/DetailImage';
import DetailText from '../detailText/DetailText';
import DetailBuy from '../detailBuy/DetailBuy';

import { LeftDiv, RightDiv } from './detail.styled';
import DetailComment from '../detailComment/DetailComment';

const Detail = () => {
  // 매물 아이디
  const { id } = useParams();

  window.addEventListener("scroll", ()=>{
    // if (window.scrollY >= document.querySelector("#detailImage").getBoundingClientRect().top + window.scrollY) {
    if (window.scrollY >= document.querySelector("[id='detailImage']").getBoundingClientRect().bottom + window.scrollY) {
      // document.querySelector("[id='detailBuy']").classList.add("fixed");
      document.querySelector("[id='rightDiv']").classList.add("fixed");
    } else {
      // document.querySelector("[id='detailBuy']").classList.remove("fixed");
      document.querySelector("[id='rightDiv']").classList.remove("fixed");
    }

  })



  // 매물 상세 정보 요청
  const getEstateDetail = async () => {
    const { data } = await axios.get("http://localhost:8080/detail/1", {
      withCredentials : true
    });
    console.log(data);
    return data;
  }

  const { data, isLoading } = useQuery(['estate', id], getEstateDetail);

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <>
      <div id='detailImage'>
      <DetailImage list={[data.estate.img_1, data.estate.img_2, data.estate.img_3, data.estate.img_4, data.estate.img_5, data.estate.img_6, data.estate.img_7]} />
      </div>
      <LeftDiv>
        <DetailText estate = {data.estate}/>
      </LeftDiv>
      <div id='rightDiv'>
      <RightDiv>
        <DetailBuy estate = {data.estate} seller = {data.seller} like = {data.like}/>
      </RightDiv>
      </div>
      <div>
        <DetailComment comment = {data.estate.Comments}></DetailComment>

      </div>
      {/* <div>like : {data.like}</div>
      <div>seller : {data.seller}</div> */}
    </>
  )
}

export default Detail