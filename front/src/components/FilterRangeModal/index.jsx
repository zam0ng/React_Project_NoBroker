import React , {useRef} from 'react'
import { 
  FilterModalContainer,
  ModalHeaderWrap,
  RangeCriteria,
  TooltipSliderContainer
  } from 'components/FilterRangeModal/styles'

import Slider, { Range } from 'rc-slider';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';
import 'rc-slider/assets/index.css';
import { defaultTest } from 'components/FilterRangeModal/defaultTest'

import RangeSlider from 'components/RangeSlider/index';


const FilterRangeModal = ({ priceRangeValue, left , handlePriceRangeBox }) => {
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
                <div> 무제한 </div>
              </RangeCriteria>
              
            </ModalHeaderWrap>

            </form>
          </FilterModalContainer>
    </>
  )
}

export default FilterRangeModal