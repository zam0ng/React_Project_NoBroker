
import React, { useRef, useState } from 'react';
import styled from 'styled-components'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css'; // 작동함🔵

// 데모에서 보면, 이건 스타일 css 임포트 하는 것 | 나는 styled component 만들어서 가져와보기
    // import './styles.css';  | 나는 이걸로 하면 에러남
import {
    StyledSwiper , 
    StyledSwiperSlide , 
    GlobalStyle
} from './styles'

// import required modules
import { EffectFade, Navigation, Pagination , Autoplay } from 'swiper/modules';






const PriceAverageSwiper = () => {

    return (
    <>
        <GlobalStyle/>   
            <StyledSwiper 
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    }}
                modules={[
                        Autoplay,
                        // EffectFade, 
                        Navigation, 
                        // Pagination
                    ]}
                className="mySwiper"
            >
            <StyledSwiperSlide>
                1억
            </StyledSwiperSlide>

            <StyledSwiperSlide>
                2억
            </StyledSwiperSlide>
            
            <StyledSwiperSlide>
                3억
            </StyledSwiperSlide>
            
            <StyledSwiperSlide>
                호호호
            </StyledSwiperSlide>

            <StyledSwiperSlide>
                호호호해해
            </StyledSwiperSlide>

            </StyledSwiper>
    </>
    )

}

export default PriceAverageSwiper