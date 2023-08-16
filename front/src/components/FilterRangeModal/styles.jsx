import styled from 'styled-components'

export const FilterModalContainer = styled.div`
    z-index : 1;
    position: absolute;
    left : 0px ;
    /* left :  -530px; */
    left : ${props => props.left || '0px'};
    top : 60px;
    /* top: calc(100% + 5px); */

    /* 👇 가져온 것들 */
    /* 밑에 부분 그림자 지는거 ⭐ */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 18px -10px;
    border: 1px solid rgb(158, 158, 158);
    border-radius: 3px;
    background-color: rgb(255, 255, 255);
    width: 320px;

    max-height: 336px;
    height : 200px;


    /* 내가 추가 수정 하는 부분 */
    display : flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

`


export const TooltipSliderContainer = styled.div`
    width : 400px;
    height : 100px;
    /* background-color : green; */
    z-index : 3;

` 


export const ModalHeaderWrap = styled.div`

    height : 100px;
    margin-left : 30px;

    display : flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;

    & h1 {
        color: rgb(59, 59, 59);
        font-size: 18px;
        font-weight: 600;
        line-height: 27px;
    }

    /* & p {
        color: rgb(134, 134, 134);
        font-size: 13px;
        font-weight: 400;
        margin: 4px 0px;
        line-height: 20px;
    } */

`


export const RangeCriteria = styled.div`
    
    display : flex;
    justify-content: space-between;
    width : 100%;

    letter-spacing : -1px;
    font-size: 12px;
    line-height: 18px;
    /* text-align: center; */
    color: rgb(170, 170, 170);



    & div:nth-child(1) {
        margin-left : 3px
    }
    
    & div:nth-child(2) {
        margin-left : 32px
    }

`