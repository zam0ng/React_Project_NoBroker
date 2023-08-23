import React , {useRef} from 'react'
import { 
  FilterModalContainer,
  TooltipSliderContainer, 
  RangeCriteria, 
  ModalHeaderWrap,
  FilterModalAreaContainer,
  ModalAreaHeaderWrap,
  AreaRangeCriteria,
  InfiniteAreaBtn,
  
  } from 'components/FilterRangeModal/styles'

import Slider, { Range } from 'rc-slider';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';
import 'rc-slider/assets/index.css';
import { defaultTest } from 'components/FilterRangeModal/defaultTest'

import AreaRangeSlider from 'components/AreaRangeSlider/index';


const FilterRangeModal = ({ areaRangeValue, left , handleAreaRangeBox }) => {
  const _tooltipRef = useRef(null);
  
  return (
    <>
          <FilterModalAreaContainer left={left} >

            <form action="">

            <ModalAreaHeaderWrap>

              <h1> 면적 </h1>

              <AreaRangeSlider handleAreaRangeBox={handleAreaRangeBox} />

            <AreaRangeCriteria>
                <div> 0 </div>
                <div> 75평 </div>
                <div> 150평 </div>
            </AreaRangeCriteria>

            <InfiniteAreaBtn 
              // onClick={ () => handlePriceRangeBox(1000000000) }   // 100억 까지 조회되게 설정
              // handlePriceRangeBox
              > 
              <p>면적 무제한</p>
            </InfiniteAreaBtn>
        
              {/* <label> 집 평수 | 단위는 m2 | 표현은 평 까지 함 </label> */}
            </ModalAreaHeaderWrap>
            
            </form>
          </FilterModalAreaContainer>
    </>
  )
}

export default FilterRangeModal