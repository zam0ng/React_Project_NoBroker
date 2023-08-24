import styled from 'styled-components'

export const AdminPageDefault = styled.section`
    min-height : 100vh;
    margin-bottom : 50px;
    /* margin: 0px; */
    padding: 0px;
    border: 0px;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;

`

export const TitleHeaderWrap = styled.div`

    margin-top : 10px;
    margin-bottom : 30px;
    /* margin-left : 90px; */

    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        color : rgb(59, 59, 59);
        font-size : 220%;
        font-weight : 800;
        letter-spacing : -1px;
        /* line-height : 27px/ */
    }
    
    & p {
        color : rgb(134, 134, 134);
        letter-spacing : -1px;
        font-size : 130%;
        font-weight : 600;
        margin-top : -20px;
        /* line-height : 20px; */
    }
`

export const UserListWrap = styled.div`
    margin : 0 auto;
    width : 1500px;
    background-color: rgb(255, 229, 197);
    font-size : 16px;
    font-weight : 300;
    display : flex;
    color : rgb(15, 15, 15);
    height : 65px;
    
    justify-content: space-evenly;

    /* margin-left : 10px; */
    border-bottom: 1px solid rgb(243, 243, 243);
    letter-spacing : -0.5px;

    flex-shrink : 0;
    align-items: center;


    > p:nth-child(1) {
        width : 80px;
        flex-shrink : 0;
        /* background-color : blue; */
    }
    /* 유저이름 */
    > p:nth-child(2) {
        width : 80px;
        flex-shrink : 0;
        /* background-color : lightgreen; */
    }
    /*  주소 */
    > p:nth-child(3) {
        width : 250px;
        flex-shrink : 0;
        /* background-color : pink; */
    }
    /* 전화번호 */
    > p:nth-child(4) {
        width : 120px;
        flex-shrink : 0;
        /* background-color : lightyellow; */
    }
    /* 허위 매물 등록 횟수 */
    > p:nth-child(5) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : blue; */
    }
    /* 판매 가능 여부 */
    > p:nth-child(6) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightgray */
    }
    /* 공인중개사 회원 여부 */
    > p:nth-child(7) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightcoral */
    }
    /* 공인중개사 자격증 이미지 | 
        목차는 styled component 에서 주고, 내용물은 inline css 로 줌 | <div style={{width : '100px'}}> */
    > p:nth-child(8) { 
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightblue */
    }

    // 인감사진 | 사이즈를 좀 더 키워야? 
        /* 목차는 styled component 에서 주고, 내용물은 inline css 로 줌 | <div style={{width : '100px'}}>  */
    > p:nth-child(9) { 
        width : 80px;
        flex-shrink : 0;
        /* background-color : lightcoral */
    }
    
    /* 업자 인증 버튼 */
    > div:nth-child(10) { 
        width : 90px;
        flex-shrink : 0;
        /* background-color : lightcoral; */
        display : flex;
        justify-content: space-evenly;
    }

`

export const UserItemWrap = styled.div`
    width : 1500px;
    margin : 0 auto;

    position : relative;

    font-size : 16px;
    letter-spacing : -0.9px;
    font-weight : 300;
    color : rgb(10,10,10);    

    display : flex;
    align-items: center;
    justify-content: space-evenly;

    border-bottom: 1px solid rgb(243, 243, 243);
    letter-spacing : -1px;

    flex-shrink : 0;
    
    > p:nth-child(1) {
        width : 80px;
        flex-shrink : 0;
        /* background-color : blue; */
    }
    /* 유저이름 */
    > p:nth-child(2) {
        width : 80px;
        flex-shrink : 0;
        /* background-color : lightgreen; */
    }
    /*  주소 */
    > p:nth-child(3) {
        width : 250px;
        flex-shrink : 0;
        /* background-color : pink; */
    }
    /* 전화번호 */
    > p:nth-child(4) {
        width : 120px;
        flex-shrink : 0;
        /* background-color : lightyellow; */
    }
    /* 허위 매물 등록 횟수 */
    > p:nth-child(5) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : blue; */
    }
    /* 판매 가능 여부 */
    > p:nth-child(6) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightgray */
    }
    /* 공인중개사 회원 여부 */
    > p:nth-child(7) {
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightcoral */
    }
    /* 공인중개사 자격증 이미지 */
    > p:nth-child(8) { 
        width : 100px;
        flex-shrink : 0;
        /* background-color : lightblue */
    }

    // 인감사진 | 사이즈를 좀 더 키워야? 
    > p:nth-child(9) { 
        width : 80px;
        flex-shrink : 0;
        /* background-color : lightcoral */
    }
    
    /* 업자 인증 버튼 */
    > div:nth-child(10) { 
        height : 70px;
        /* background-color : blue; */

        width : 90px;
        flex-shrink : 0;
        /* background-color : lightcoral; */
        display : flex;
        justify-content: center;
        align-items : center;
    
    }
`


export const ImageContainer = styled.div`

    cursor: pointer;
    
    
    width : 50px;
    height : 50px;

    background-image : url(${props => props.imageUrl});
    background-position : center;
    background-repeat : no-repeat;
    background-size : cover;

`

export const ClickedImageContainer = styled.div`

    cursor: pointer;
    position : fixed;
    top: 20%;
    left: 65%;
    /* transform: translate(-50%, 1%); */
    z-index: 2000;
    
    display : ${props => props.display} ;
    width : 500px;
    height : 500px;

    background-image : url(${props => props.imageUrl});
    background-position : center;
    background-repeat : no-repeat;
    background-size : cover;

`
export const SealImageContainer = styled.div`

    cursor: pointer;
    
    
    width : 50px;
    height : 50px;

    background-image : url(${props => props.imageUrl});
    background-position : center;
    background-repeat : no-repeat;
    background-size : cover;

`

export const SealClickedImageContainer = styled.div`

    cursor: pointer;
    position : fixed;
    top: 20%;
    left: 65%;
    /* transform: translate(-50%, 1%); */
    z-index: 2000;
    
    display : ${props => props.display} ;
    width : 500px;
    height : 500px;

    background-image : url(${props => props.imageUrl});
    background-position : center;
    background-repeat : no-repeat;
    background-size : cover;

`


export const ApproveBtn = styled.button`
    cursor: pointer;
    font-family : 'GmarketSansMedium';    
    width : 60px;
    font-size: 15px;
    font-weight : 500;
    letter-spacing : 1px;

    height : 30px;
    border : none;
    border-radius : 2px;
    background-color : rgb(255 165 0);
    color : rgb(250, 250, 250);

    `
    

    export const DisapproveBtn = styled.button`
    cursor: pointer;
    font-family : 'GmarketSansMedium';    
    width : 60px;
    font-size: 15px;
    font-weight : 500;
    letter-spacing : 1px;

    font-family : 'GmarketSansMedium';    
    width : 60px;
    height : 30px;
    border : none;
    color : rgb(10,10,10);
    background-color : rgb(224, 224, 224);

`


export const ButtonWrap = styled.div`
    width: 120px;
    height : 70px;

    display: flex;
    /* background-color: green; */
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

`


export const AvailableForSale = styled.div`

    background-color: #ddddf7;

    width: 80px;
    font-size : 15px;
    font-weight: 300;
    letter-spacing : 0.1px;
    color: #2323ff;
    display: flex;
    height: 32px;
    border-radius: 3px;
    justify-content: center;
    align-items: center;

`

export const NotForSale = styled.div`
    
    background-color: #f7dddd;

    width: 80px;
    font-size : 15px;
    font-weight: 300;
    letter-spacing : 0.1px;
    color: #ff4423;
    display: flex;
    height: 32px;
    border-radius: 3px;
    justify-content: center;
    align-items: center;

`


export const GeneralUser = styled.div`
    color: #555555;
    font-size : 15px;
    font-weight: 300;

    display : flex;
    align-items : center;
    justify-content : center;


    >div::before {
        content : '';
        width : 7px;
        height : 7px;
        display : inline-block;
        background-color : #555555;
        border-radius : 50%;
        margin-right : 1px;
    }

`


export const ApprovedAgent = styled.div`
    color: #5050fa;
    font-size : 15px;
    font-weight: 300;

    >div::before {
        content : '';
        width : 7px;
        height : 7px;
        display : inline-block;
        background-color : #5050fa;
        border-radius : 50%;
        margin-right : 1px;
    }


`

export const DecisionInProcessAgent = styled.div`
    color : #197a19;
    font-size : 15px;
    font-weight: 300;

    >div::before {
        content : '';
        width : 7px;
        height : 7px;
        display : inline-block;
        background-color : #197a19;
        border-radius : 50%;
        margin-right : 1px;
    }

`

export const LeaveOutAgent = styled.div`
    color: #ff725a;
    font-size : 15px;
    font-weight: 300;

    >div::before {
        content : '';
        width : 7px;
        height : 7px;
        display : inline-block;
        background-color : #ff725a;
        border-radius : 50%;
        margin-right : 1px;
    }



`





// export const BackgroundImg = styled.div`
//     position : fixed;
//     z-index : 100;
//     top : 0;
//     background-color : rgba(0,0,0,0.3);
//     width : 2000px;
//     height : 2000px;
    
//     display : flex;
//     justify-content : center;
//     align-items : center;
// `



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