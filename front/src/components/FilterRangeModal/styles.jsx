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

export const FilterModalAreaContainer = styled.div`
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

    height : 200px;
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

//ModalAreaHeaderWrap
export const ModalAreaHeaderWrap = styled.div`

    height : 200px;
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
    margin-top : 10px;

    /* border-bottom: 1px solid rgb(231, 231, 231); */


    & div:nth-child(1) {
        margin-left : 3px
    }
        & div:nth-child(1)::before{
            content: "";
            width: 1px;
            height: 5px;
            background-color: rgb(204, 204, 204);
            position: absolute;
            top: 105px;
            left: 50%;
            transform: translateX(-50%);
        }

    
    & div:nth-child(2) {
        margin-left : 15px
    }
        & div:nth-child(2)::before{
            content: "";
            width: 1px;
            height: 5px;
            background-color: rgb(204, 204, 204);
            position: absolute;
            top: 105px;
            left: 11.5%;
            transform: translateX(-50%);
        }
        
        & div:nth-child(3) {
            margin-right : -10px
        }
            & div:nth-child(3)::before{
                content: "";
                width: 1px;
                height: 5px;
                background-color: rgb(204, 204, 204);
                position: absolute;
                top: 105px;
                left: 89%;
                transform: translateX(-50%);
            }
        
`

// AreaRangeCriteria
export const AreaRangeCriteria = styled.div`
    
    display : flex;
    justify-content: space-between;
    width : 100%;

    letter-spacing : -1px;
    font-size: 12px;
    line-height: 18px;
    /* text-align: center; */
    color: rgb(170, 170, 170);
    margin-top : 1px;

    /* border-bottom: 1px solid rgb(231, 231, 231); */


    & div:nth-child(1) {
        margin-left : 3px
    }
        & div:nth-child(1)::before{
            content: "";
            width: 1px;
            height: 5px;
            background-color: rgb(204, 204, 204);
            position: absolute;
            top: 110px;
            left: 50%;
            transform: translateX(-50%);
        }
    
    
    & div:nth-child(2) {
        margin-left : 15px
    }
        & div:nth-child(2)::before{
            content: "";
            width: 1px;
            height: 5px;
            background-color: rgb(204, 204, 204);
            position: absolute;
            top: 110px;
            left: 11.5%;
            transform: translateX(-50%);
        }
        
        & div:nth-child(3) {
            margin-right : 8px
        }
            & div:nth-child(3)::before{
                content: "";
                width: 1px;
                height: 5px;
                background-color: rgb(204, 204, 204);
                position: absolute;
                top: 110px;
                left: 88%;
                transform: translateX(-50%);
            }
        
`


export const InfinitePriceBtn = styled.button`
    color: rgb(34, 34, 34);

    font-size: 13px;
    font-weight: 400;
    width: 96px;
    height: 40px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 2px;
    background-color: rgb(255, 255, 255);

    display : flex;
    justify-content : center;
    align-items : center;

    margin-left : 66%;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02); */
    /* border-top: 1px solid rgb(231, 231, 231); */

    cursor: pointer;



    > p {
        color : #0f0f0f;
    }

`

// InfiniteAreaBtn
export const InfiniteAreaBtn = styled.button`
    color: rgb(34, 34, 34);

    font-size: 13px;
    font-weight: 400;
    width: 96px;
    height: 40px;
    border: 1px solid rgb(224, 224, 224);
    border-radius: 2px;
    background-color: rgb(255, 255, 255);

    display : flex;
    justify-content : center;
    align-items : center;

    margin-left : 63%;
    /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02); */
    /* border-top: 1px solid rgb(231, 231, 231); */

    cursor: pointer;



    > p {
        color : #0f0f0f;
    }

`