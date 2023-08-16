import React from 'react'

const ComboboxOption = ({value, onClick}) => {
  return (

    
        <div>
            {/* 지금 추천된 값이 선택되면 -> onClick 라는 props 를 타고온 handleSelect 의 매개변수로 전달해서 -> 위로 올라가서 위도, 경도로 변환하기 */}
            <span onClick={(e) => { onClick(e.target.value) }} > 지금 추천된 값 :  {value} </span>

        </div>
        

  )
}

export default ComboboxOption