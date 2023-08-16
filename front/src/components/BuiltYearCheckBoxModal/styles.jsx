import styled from 'styled-components'

export const FilterModalContainer = styled.div`
    z-index : 1;
    position: absolute;
    left : 0px ;
    /* left :  -530px; */
    left : ${props => props.left || '0px'};
    top : 60px;

    
    /* 👇 가져온 것들 */
    /* 밑에 부분 그림자 지는거 ⭐ */
    box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 18px -10px;

    border: 1px solid rgb(158, 158, 158);
    border-radius: 3px;
    background-color: rgb(255, 255, 255);
    width: 320px;
    max-height: 336px;

    /* height: 774px; */
    height : ${props => props.height || '200px'};


    /* 내가 추가 수정 하는 부분 */
    display : flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    /* margin-right : 110px;
    width : 300px;
    height : 200px;
    background-color : hotpink; */
`

export const ModalHeaderWrap = styled.div`   
    margin-left : 30px;
    display : flex;
    flex-direction: column;
    align-items: flex-start;


    

    & h1 {
        color: rgb(59, 59, 59);
        font-size: 18px;
        font-weight: 600;
        line-height: 27px;
    }

    & p {
        color: rgb(134, 134, 134);
        font-size: 13px;
        font-weight: 400;
        margin: 4px 0px;
        line-height: 20px;
    }

`


export const ModalContentWrap = styled.div`
    
    /* margin-top : -81px; */


    /* padding: 16px 0px; */
    display : flex;
    flex-direction: column;
    justify-content: space-evenly;

    margin-top: 10px;
    margin-bottom : -10px;
    margin-left: 30px;

    height: 75px;
    width: 80%;

    border-top: 1px solid rgb(243, 243, 243);
    border-bottom: 1px solid rgb(243, 243, 243);


    & label {
        display : flex;

    }

    & div {
        
        display : flex;
        /* margin-top : -10px; */
        /* margin-bottom : -10px; */
        /* margin-bottom : 5px; */
        /* background-color : pink; */
    }



    & input:checked + div {
    background-image: url("/static/media/check_off.svg");
    /* 기타 스타일 설정 */
}

`



export const ModalCheck = styled.div`
    
    display : flex;
    align-items : center;


    

    & input {
        background-size : contain; 
        cursor: pointer;
        width : 18px;
        height : 18px;
    }

    & input:checked {
        color : blue;
        background-color : blue;
        /* background-image: url('/img/check_on.69c33c47.svg'); */
    }

    & input:not(:checked) {
        background-image: url('/img/check_off.083925b2.svg');
    }

    & label {
        padding-left : 8px;
        color: rgb(76, 76, 76);
        font-size: 14px;
        user-select: none;
        cursor: pointer;
        letter-spacing : -0.9px
    }
`