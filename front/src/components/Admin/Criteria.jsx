import React from 'react'


const Criteria = () => {
  return (
    <>

        {/* user_id  */}
        <p>회원 ID </p>

        {/* user_name */}
        <p>유저이름</p>

        {/* address */}
        <p>주소</p>

        {/* phone */}
        <p>전화번호</p>

        {/* fake_count */}
        <p>허위매물 <br></br>
        등록 횟수</p>

        {/* ban */}
        <p>판매 가능 여부</p>

        {/* | role + certificate_user | 1가지 중 하나로 표시 | 파란색 0: 공인중개사 승인, 파란색 1: 신청중, 파란색 2: 승인 거절 핑크색 : 일반 유저 */}
        <p> 공인 중개사 <br></br>
        회원 여부 </p>

        {/* | certificate_img | */}
        <p> 공인 중개사 <br></br>
        자격증 이미지</p>

        {/* | seal_img | */}
        <p>인감 사진</p>

        {/* | 인증, 미승인 |  */}
        <p>업자 인증 버튼 </p>


    </>
  )
}

export default Criteria