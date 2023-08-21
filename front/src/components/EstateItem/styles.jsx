import styled from 'styled-components'

export const CardItemWrapper = styled.div`
    background-color : blue;
    display : flex;
    height : 200px;
    border-bottom: 1px solid rgb(231, 231, 231);
    cursor: pointer;

`

export const CardItem = styled.div`

    /* background-color : rosybrown; */
    width : 100%;
    padding : 16px 15px;
    display : flex;

`


export const ImgWrap = styled.div`
    width : 140px;
    height : 140px;
    min-height : 140px;
    position : relative;
    flex-shrink : 0;
`


export const ImgThumbnail = styled.div`
    width : 100%;
    height : 100%;
    
    display: flex; 
    justify-content : center; 
    align-items : center; 

    border-radius : 2px;
    
    background-size : 60px 60px;

    position : relative;
    
    & img {
        width : 100%;
        height : 100%;
        object-fit : cover;
        border-radius : 2px;
    }
`

export const InfoWrap = styled.div`
    padding-left : 20px;
    width : 205px;
    height : 100%;
    display : flex;
    flex-direction : column;
    justify-content: space-evenly;
    align-items : flex-start;
`

export const LikeBtnWrap = styled.button`
    
    cursor: pointer;
    /* position : relative;/ */

        > img {
            width : 23px;
            height : 23px;
            object-fit : cover;
            position : absolute;
            top : 7px;
            right : 7px;
        }
`

export const HeaderPrice = styled.h1`
    font-size : 18px;
    font-weight : 700;
    height : 27px;
    letter-spacing : -1px;
    /* 👇 다방은 넣었는데, 전체적인거 보고 수정하기 */
    /* margin-bottom : 4px; */
    /* line-height: 27px; */
`

export const RoomType = styled.div`
    font-size : 13px;
    font-weight : 400;

    letter-spacing : -1px;
    white-space : nowrap;
    text-overflow : ellipsis;
    overflow : hidden;
`

export const RoomDesc = styled.div`

    width : 195px;
    text-align : left;
    font-size : 14px;
    font-weight : 400;
    letter-spacing : -0.9px;

    white-space : nowrap;
    text-overflow : ellipsis;
    overflow : hidden;
`

export const SellerType = styled.div`

    display : flex;


    > span:nth-child(1) {
        display : flex;
        justify-content : center;
        align-items : center;
        width : 46px;
        height : 22px;
        font-size : 12px;
        color : rgb(248, 118, 128);
        border : 1px solid rgb(248, 118, 128);
        letter-spacing : -1px;

    }
    
    > span:nth-child(2) {
        margin-left : 5px;
        display : flex;
        justify-content : center;
        align-items : center;
        width : 46px;
        height : 22px;
        font-size : 12px;
        color : rgb(139, 124, 253);
        border : 1px solid rgb(139, 124, 253);
        letter-spacing : -1px;

    }

`

