import styled from 'styled-components'

const FilterModalContainer = styled.div`
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
    /* background-color : pink; */
    width: 320px;

    max-height: 336px;
    height : 200px;


    /* 내가 추가 수정 하는 부분 */
    display : flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`

                    // 이전 버전 keep 
                    // const FilterModalContainer = styled.div`
                    //     z-index : 1;
                    //     position: absolute;
                    //     left : 0px ;
                    //     /* left :  -530px; */
                    //     left : ${props => props.left || '0px'};
                    //     top : 60px;
                    //     /* top: calc(100% + 5px); */
                    //     /* left: 0px; */

                    //     /* margin-right : 110px; */
                    //     width : 300px;
                    //     height : 200px;
                    //     background-color : hotpink;
                    // `

export default FilterModalContainer