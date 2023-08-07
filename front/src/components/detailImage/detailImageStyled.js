import styled from 'styled-components'

// 이미지 div
export const DetailImg = styled.div`
    border: 4px solid grey;
    width: 50px;
    height: 50px;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;

    & img {
        width: 50px;
    }
`

export const BigDetailImg = styled.div`
    width : 800px;
    background-color: aliceblue;

    & img {
        /* width: 700px; */
        height: 400px;
    }
`

export const ImgDiv = styled.div`
    width: 100%;
    background-color: grey;

    display: flex;

    justify-content: center;
    align-items: center;

    & button {
        height: 20px;
    }
`

export const PopupBack = styled.div`
    width : 100%;
    height: 100vh;
    background-color: rgba(100,100,100,0.5);
    position: absolute;
    /* display: none; */
    display: ${(props) => props.display || "none"};
    justify-content: center;
    align-items: center;

    & #popupImg {
        width : 800px;

    }
`

export const SmallImgDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    /* border: 4px solid black; */

    & div {
        width : 500px;
        display: flex;
        justify-content: space-around;
    }
`