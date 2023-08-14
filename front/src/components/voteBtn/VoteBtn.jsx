import React from 'react'
import { Btn, BtnDiv } from './voteBtn.styled'

const VoteBtn = ({estate, queryClient}) => {
    // 투표, 투표 완료했을때 보여지는 부분
    // estate의 투표 가능 여부에 따라 버튼 표시

    // 투표했다는 뭐냐 그거 알려

    // detail에서 해당 유저가 투표한 적 있는지 여부 확인(정보 표시)

  return (
    <BtnDiv>
        {estate.accpet==0? <><Btn>정상매물</Btn><Btn>허위매물</Btn></>  : <><Btn>투표 불가</Btn></>}
    </BtnDiv>
  )
}

export default VoteBtn