import styled from 'styled-components'

export const AdminPageDefault = styled.section`
    margin: 0px;
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;

`

export const TitleHeaderWrap = styled.div`

    margin-top : 10px;
    margin-bottom : 30px;
    margin-left : 90px;
    display : flex;
    flex-direction : column;
    align-items : flex-start;

    & h1 {
        color : rgb(59, 59, 59);
        font-size : 18px;
        font-weight : 600;
        /* line-height : 27px/ */
    }

    & p {
        color : rgb(134, 134, 134);
        font-size : 13px;
        font-weight : 400;
        margin-top : -7px;
        /* line-height : 20px; */
    }
`

export const UserListWrap = styled.div`
    
    font-size : 16px;
    font-weight : 600;
    display : flex;
    color : rgb(134, 134, 134);
    
    justify-content: space-evenly;

    border-bottom: 1px solid rgb(243, 243, 243);
    letter-spacing : -1px;

    flex-shrink : 0;

    > p:nth-child(1) {
        width : 80px;
        /* background-color : blue; */
    }
    /* 유저이름 */
    > p:nth-child(2) {
        width : 80px;
        /* background-color : lightgreen; */
    }
    /*  주소 */
    > p:nth-child(3) {
        width : 250px;
        /* background-color : pink; */
    }
    /* 전화번호 */
    > p:nth-child(4) {
        width : 120px;
        /* background-color : lightyellow; */
    }
    /* 허위 매물 등록 횟수 */
    > p:nth-child(5) {
        width : 100px;
        /* background-color : blue; */
    }
    /* 판매 가능 여부 */
    > p:nth-child(6) {
        width : 100px;
        /* background-color : lightgray */
    }
    /* 공인중개사 회원 여부 */
    > p:nth-child(7) {
        width : 100px;
        /* background-color : lightcoral */
    }
    /* 공인중개사 자격증 이미지 */
    > p:nth-child(8) { 
        width : 100px;
        /* background-color : lightblue */
    }

    // 인감사진 | 사이즈를 좀 더 키워야? 
    > p:nth-child(9) { 
        width : 80px;
        /* background-color : lightcoral */
    }
    
    /* 업자 인증 버튼 */
    > div:nth-child(10) { 
        width : 120px;
        /* background-color : lightcoral; */
        display : flex;
        justify-content: space-evenly;
    }

`

export const UserItemWrap = styled.div`

    font-size : 16px;
    letter-spacing : -0.9px;
    font-weight : 600;
    color : rgb(10,10,10);    
    width : 100%;


    display : flex;
    align-items: center;
    justify-content: space-evenly;

    border-bottom: 1px solid rgb(243, 243, 243);
    letter-spacing : -1px;

    flex-shrink : 0;

    
    > p:nth-child(1) {
        width : 80px;
        /* background-color : blue; */
    }
    /* 유저이름 */
    > p:nth-child(2) {
        width : 80px;
        /* background-color : lightgreen; */
    }
    /*  주소 */
    > p:nth-child(3) {
        width : 250px;
        /* background-color : pink; */
    }
    /* 전화번호 */
    > p:nth-child(4) {
        width : 120px;
        /* background-color : lightyellow; */
    }
    /* 허위 매물 등록 횟수 */
    > p:nth-child(5) {
        width : 100px;
        /* background-color : blue; */
    }
    /* 판매 가능 여부 */
    > p:nth-child(6) {
        width : 100px;
        /* background-color : lightgray */
    }
    /* 공인중개사 회원 여부 */
    > p:nth-child(7) {
        width : 100px;
        /* background-color : lightcoral */
    }
    /* 공인중개사 자격증 이미지 */
    > p:nth-child(8) { 
        width : 100px;
        /* background-color : lightblue */
    }

    // 인감사진 | 사이즈를 좀 더 키워야? 
    > p:nth-child(9) { 
        width : 80px;
        /* background-color : lightcoral */
    }
    
    /* 업자 인증 버튼 */
    > div:nth-child(10) { 
        width : 120px;
        /* background-color : lightcoral; */
        display : flex;
        justify-content: space-evenly;
    
    }




`


// export const CriteriaContainer = styled.div`
//     font-size : 16px;
//     font-weight : 600;
//     color : rgb(134, 134, 134);
    
//     display : flex;
//     justify-content: space-evenly;

//     border-bottom: 1px solid rgb(243, 243, 243);
//     letter-spacing : -1px;

//     flex-shrink : 0;

//     > p:nth-child(1) {
//         width : 80px;
//         background-color : blue;
//     }
//     /* 유저이름 */
//     > p:nth-child(2) {
//         width : 80px;
//         background-color : lightgreen;
//     }
//     /*  주소 */
//     > p:nth-child(3) {
//         width : 80px;
//         /* background-color : pink; */
//     }
//     /* 전화번호 */
//     > p:nth-child(4) {
//         width : 80px;
//         background-color : lightyellow;
//     }
//     /* 허위 매물 등록 횟수 */
//     > p:nth-child(5) {
//         width : 100px;
//         background-color : blue;
//     }
//     /* 판매 가능 여부 */
//     > p:nth-child(6) {
//         width : 100px;
//         background-color : lightgray
//     }
//     /* 공인중개사 회원 여부 */
//     > p:nth-child(7) {
//         width : 100px;
//         background-color : lightcoral
//     }
//     /* 공인중개사 자격증 이미지 */
//     > p:nth-child(8) { 
//         width : 100px;
//         background-color : lightblue
//     }

//     // 인감사진 | 사이즈를 좀 더 키워야? 
//     > p:nth-child(9) { 
//         width : 80px;
//         background-color : lightcoral
//     }
    
//     /* 업자 인증 버튼 */
//     > p:nth-child(10) { 
//         width : 80px;
//         background-color : lightcoral;        
//     }


// `