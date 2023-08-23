import React from 'react';
import Slider from 'rc-slider';
import 'components/RangeSliderAsset/index.less';
import TooltipSlider, { handleRender } from 'components/TooltipSlider';

const wrapperStyle = { 
                  width: 255, 
                  margin: 7 
                };

function AreaRangeSlider({handleAreaRangeBox}) {
  return (
    <div>

      <div style={wrapperStyle}>
        {/* <p>Range with custom tooltip</p> */}
        
        <TooltipSlider
            defaultValue={[0, 480]}  // 초기 설정값 0원 ~ 300m2
            range
            
            step = {3.3}  // 1의 자리 = 1평
            min={1}    // 16m2 , 5평,      
            max={500}  // 최대 100평,  
            onChange = {handleAreaRangeBox}     // 사용자가 설정한 값을, 자동으로 handle 함수의 인자, 로 설정함
            tipFormatter={(value) => `${Math.floor(value)}㎡ (${Math.floor(value/3.3)}평)`}    // '\u339C' == ㎡ 이거 임 
            
            // handleStyle={{
              // borderColor: 'blue',
              // height: 28,
              // width: 28,
              // marginLeft: -14,
              // marginTop: -9,
              // backgroundColor: 'black',
            // }}
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