
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';


export const GlobalStyle = createGlobalStyle`
    
    
    .swiper-button-prev {
    width: 30px;
    height: 30px;
    background-size: 20px 20px;
    background-color : green;
    }

    .swiper-button-prev::after {
        margin-left: -10px;
        font-size : 1rem;
    }

`

export const StyledSwiper = styled(Swiper)`
    /* // 여기서 classname .swiper 에 css 를 주려면? ?  */
    width : 500px;
    height : 300px;
    background-color : lightcyan;
`

export const StyledSwiperSlide = styled(SwiperSlide)`
    background-position: center;
    background-size: cover;
    
    img{
        display: block;
        width: 100%;
    }
`

