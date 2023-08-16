import React , {useRef} from 'react'
import { 
  FilterModalContainer,
  TooltipSliderContainer
  } from 'components/FilterRangeModal/styles'

import Slider, { Range } from 'rc-slider';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';
import 'rc-slider/assets/index.css';
import { defaultTest } from 'components/FilterRangeModal/defaultTest'

import AreaRangeSlider from 'components/AreaRangeSlider/index';


const FilterRangeModal = ({ priceRangeValue, left , handleAreaRangeBox }) => {
  const _tooltipRef = useRef(null);
  
  return (
    <>
          <FilterModalContainer left={left} >

            <form action="">

            {/* <defaultTest>  */}

            <AreaRangeSlider handleAreaRangeBox={handleAreaRangeBox} />

            {/* </defaultTest> */}

            {/* <input 
              type="range" 
              min="1" max="100" value="50" class="slider" id="myRange" /> */}

            
              <label> 집 평수 | 단위는 m2 | 표현은 평 까지 함 </label>
            
            </form>
          </FilterModalContainer>
    </>
  )
}

export default FilterRangeModal