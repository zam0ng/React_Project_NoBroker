import { styled } from "styled-components";

export const MypageAlldiv = styled.div` 
    width: 1300px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin : 0 auto;
`
export const MypageContainer = styled.div`
    width: 95%;
    height: ${(props)=>props.height};
    border-top: 1px solid lightgray;
    display: flex;
    /* border: 1px solid; */
`
export const UserInfoDiv = styled.div`
    width: 20%;
    height: ${(props)=>props.height};
    border-right: 1px solid lightgray;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-around;

    & div{
        width: 60%;
        height: 130px;
        border: 1px solid black;
        border-radius: 50%;
    }

    & span{
        width : 100%;
        height: 50px;
        line-height: 40px;
        font-size: smaller;
    }
`

export const ListItem = styled.div`
    height: 30px;
    text-align: left;
    /* font-weight: 600 */
    font-weight: ${(props)=>props.isActive ? 600 : 100};

`
export const MypageList = styled.div`
    width: 20%;
    height: 430px;
    /* border-right: 1px solid lightgray; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`



export const FakeInfo = styled.div`
    width: 60%;
    height: 230px;

    & span{

    }
`
export const FakeDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    
    & > span {
        width: 80%;
        height: 50px;
        font-size: xx-large;
        text-align: left;
    }
    
    & > div {
        text-align: left;
        
        &:nth-of-type(1){
            width: 80%;
            height: 30px;
            display: flex;
            align-content: center;

            & span{
                width: 13%;
                text-align: center;
                border: 1px solid black;
                border-radius: 10px;
                font-size: smaller;
                line-height: 30px;
                background-color: black;
                color: white;
                font-weight: 600;
            }
        }
        
        &:nth-of-type(2){
            width: 80%;
            height: 100px;
            line-height: 100px;
        }
    }
`;
export const UserInfoUpdate = styled.div`
    width: 20%;
    height: 230px;
    display:  flex;
    align-items: center;
    justify-content: center;

    & div{
        width: 40%;
        height: 30px;
        border: 1px solid;
        border-radius: 10px;
        font-size: smaller;
        line-height: 30px;
        background-color: orange;
        color : white;
        font-weight: 600;
    }
`
export const TabInfo = styled.div`
    width: 80%;
    height: 640px;
    border-left: 1px solid lightgray;
`
export const UpdateModal = styled.div`
    width : 100%;
    height : 1100px;
    background-color: black;
    position: absolute;
    top : 0;
    left: 0;
`
export const UpdateBox = styled.div`
    width: 500px;
    height: 700px;
    border : 1px solid white;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

`