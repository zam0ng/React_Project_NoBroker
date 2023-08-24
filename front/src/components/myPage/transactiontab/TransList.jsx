import React from 'react'
import { EstateAllInfo, DateImg, OtherInfo, JustState } from '../checktab/checkstyled';
// import axios from 'axios';
import axios from '../../../Axios'
import { serverUrl } from 'components/serverURL';
import { useMutation, useQueryClient } from 'react-query';
const TransList = ({ data, el }) => {
  console.log(el);

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
  const ImgUrl = data.Real_estate.img_1?.substr(12);

  const checkCancel = async (el) => {
    const data = await axios.get("/mypage/checkcancel", {
      params: { el },
      withCredentials: true,
    })
    return data.data;
  }

  const queryClient = useQueryClient();
  const mutation = useMutation(checkCancel, {
    onSuccess: (data) => {
      console.log(data);
      if (data == "찜취소성공") {
        queryClient.invalidateQueries('mycheck');
      }
    }
  })


  const checkCancelBtn = async (el) => {
    mutation.mutate({ el });
  }

  return (
    <EstateAllInfo>
      <DateImg>
        <span>{revisedFormattedDate}</span>
        <img src={`${serverUrl}estate_imgs/${ImgUrl}`}></img>
      </DateImg>
      <OtherInfo>
        <div>{data.Real_estate.balance}만원</div>
        <div>{data.Real_estate.jibun}&nbsp;{data.Real_estate.additional_address}</div>
        <div><span>{data.Real_estate.area}㎡</span><span>,&nbsp;{data.Real_estate.type}</span></div>
      </OtherInfo>
      <JustState>
        {/* <span>{state}</span> */}
        {el === "check" ? <button onClick={() => { checkCancelBtn(data.real_estate_id) }}>찜취소</button> :
          <><span>보상금액<br></br> :{(data.Real_estate.balance * 2).toLocaleString()}원</span>
          </>}
      </JustState>


    </EstateAllInfo>
  )
}

export default TransList