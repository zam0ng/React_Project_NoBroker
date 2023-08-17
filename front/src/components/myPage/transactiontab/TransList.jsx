import React from 'react'
import {EstateAllInfo,DateImg,OtherInfo,JustState} from '../checktab/checkstyled';
const TransList = ({data}) => {
    console.log(data);

    // createdAt 시간 바꾸기
    let ta = new Date(data.createdAt);

    const options = {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(ta);

    const revisedFormattedDate = formattedDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3/$1/$2"
    );
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const ImgUrl = data.img_1?.split("\\")[2];


  return (
    <EstateAllInfo>
      <DateImg>
        <span>{revisedFormattedDate}</span>
        <img src={`http://localhost:8080/estate_imgs/${ImgUrl}`}></img>
      </DateImg>
      <OtherInfo>
        <div>{data.Real_estate.balance}만원</div>
        <div>{data.Real_estate.jibun}&nbsp;{data.Real_estate.additional_address}</div>
        <div><span>{data.Real_estate.area}㎡</span><span>,&nbsp;{data.Real_estate.type}</span></div>
      </OtherInfo>
      <JustState>
        {/* <span>{state}</span> */}
      </JustState>


    </EstateAllInfo>
  )
}

export default TransList