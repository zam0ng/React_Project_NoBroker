import React from 'react';
import Slider from 'rc-slider';
import 'components/RangeSliderAsset/index.less';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';

const wrapperStyle = { width: 200, margin: 50 };

function AreaRangeSlider({handleAreaRangeBox}) {
  return (
    <div>

      <div style={wrapperStyle}>
        <p>Range with custom tooltip</p>
        
        <TooltipSlider
            defaultValue={[0, 135]}  // 초기 설정값 0원 ~ 150m2
            range
            step = {1}  // 1의 자리 = 백만원 
            min={0}    // 16m2 , 5평,      
            max={150}  // 최대 150m2, 45평,  
            onChange = {handleAreaRangeBox}     // 사용자가 설정한 값을, 자동으로 handle 함수의 인자, 로 설정함
            tipFormatter={(value) => `${value}!`}
        />
      </div>
      

    </div>
  );
}

export default AreaRangeSlider;

// 라이브러리 기타 UI
      {/* <div style={wrapperStyle}>
        <p>Slider with custom handle</p>
        <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
      </div> */}

      {/* <div style={wrapperStyle}>
        <p>Reversed Slider with custom handle</p>
        <Slider min={0} max={20} reverse defaultValue={3} handleRender={handleRender} />
      </div>
      <div style={wrapperStyle}>
        <p>Slider with fixed values</p>
        <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
      </div> */}

            {/* <div style={wrapperStyle}>
        <p>Keyboard events disabled</p>
        <Slider defaultValue={3} keyboard={false} />
      </div> */}