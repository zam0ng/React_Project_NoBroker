import React , {useRef} from 'react'
import { 
  FilterModalContainer,
  TooltipSliderContainer
  } from 'components/FilterRangeModal/styles'

import Slider from 'rc-slider';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';
import 'rc-slider/assets/index.css';


const FilterRangeModal = ({ priceRangeValue, left , handleRangeBox }) => {
  const _tooltipRef = useRef(null);
  

  return (
    <>
          <FilterModalContainer left={left} >

            <form action="">

            <TooltipSliderContainer>
                <TooltipSlider 
                  ref={_tooltipRef}
                  range
                  min={0}
                  max={20}
                  defaultValue={[3, 10]}
                  tipFormatter={(value) => `${value}!`}
                  />
              </TooltipSliderContainer>
            
              <label> 매매가격 </label>
            
            </form>
          </FilterModalContainer>
    </>
  )
}

export default FilterRangeModal