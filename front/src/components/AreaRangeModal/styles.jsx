import styled from 'styled-components'

export const FilterModalContainer = styled.div`
    z-index : 1;
    position: absolute;
    left : 0px ;
    /* left :  -530px; */
    left : ${props => props.left || '0px'};
    top : 60px;
    /* top: calc(100% + 5px); */
    /* left: 0px; */

    /* margin-right : 110px; */
    width : 300px;
    height : 200px;
    background-color : lightgray;
`


export const TooltipSliderContainer = styled.div`
    width : 400px;
    height : 100px;
    /* background-color : green; */
    z-index : 3;

` 

