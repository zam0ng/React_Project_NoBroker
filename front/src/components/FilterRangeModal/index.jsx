import React , {useRef} from 'react'
import { 
  FilterModalContainer,
  ModalHeaderWrap,
  RangeCriteria,
  TooltipSliderContainer,
  InfinitePriceBtn
  } from 'components/FilterRangeModal/styles'

import Slider, { Range } from 'rc-slider';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';
import 'rc-slider/assets/index.css';
import { defaultTest } from 'components/FilterRangeModal/defaultTest'

import RangeSlider from 'components/RangeSlider/index';


const FilterRangeModal = ({ handlePriceInfiniteBtn, priceRangeValue, left , handlePriceRangeBox }) => {
  const _tooltipRef = useRef(null);
  

  return (
    <>
          <FilterModalContainer left={left} >

            <form action="">

            <ModalHeaderWrap>

              <h1> 매매가격 </h1>

              <RangeSlider handlePriceRangeBox={handlePriceRangeBox} />
    
              <RangeCriteria>
                <div> 0 </div>
                <div> 5억 </div>
                <div> 10억 </div>
              </RangeCriteria>


              {/* <div style={{borderTop : "1px solid rgb(0,0,0)"}} > */}
                <InfinitePriceBtn 
                  onClick={ () => handlePriceRangeBox(1000000000) }   // 100억 까지 조회되게 설정
                  // handlePriceRangeBox
                  > 
                  <p>매매가 무제한</p>
                </InfinitePriceBtn>
              {/* </div> */}

            </ModalHeaderWrap>

            </form>
          </FilterModalContainer>
    </>
  )
}

export default FilterRangeModal