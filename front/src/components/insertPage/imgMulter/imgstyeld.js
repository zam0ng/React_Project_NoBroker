import { styled } from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: ${(props) => props.height || "60px"};

  /* height: 277px; */
  /* height: 493px; */

  /* border: 1px solid black; */
  border-bottom: 1px solid rgb(219 195 158);

  display: flex;
  /* align-items: center; */
  & span {
    color: #168fff;
  }
`;
export const Title = styled.div`
  width: 140px;
  height: ${(props) => props.height || "60px"};
  /* height: 277px; */
  /* height: 493px; */
  line-height: ${(props) => props.height || "60px"};

  /* border: 1px solid black; */
  text-align: left;

  /* font-size: smaller; */
  font-weight: 600;
  display: flex;
  align-items: center;
  font-weight: 600;
  padding-left: 10px;
  font-size: 17px;
  background-color: rgb(255, 229, 197);
`;
export const MulterBox = styled.div`
  width: 90%;
  height: 60px;
  /* height: 400px; */
  /* border: 1px solid red; */
  display: flex;
  align-items: flex-start;
`;
export const ImgAdd = styled.input`
  width: 100px;
  height: 35px;
  line-height: 35px;
  /* border: 1px solid black; */
  margin-left: 10px;
  font-weight: 600;
  font-size: smaller;
`;
export const FileLabel = styled.label`
  display: inline-block;
  color: #fff;
  vertical-align: middle;
  background-color: white;
  color: black;
  border: 1px solid lightgray;
  cursor: pointer;
  width: 120px;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
  font-weight: 600;
  font-size: smaller;
`;

export const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

export const ImgBoxDiv = styled.div`
  width: 1020px;
  /* height: 210px; */
  /* height: 420px; */
  /* border:  1px solid red; */
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  & div {
    position: relative;
    width: 240px;
    height: 200px;
    /* border: 1px solid red; */
    margin-right: 15px;
    margin-bottom: 10px;
    & img {
      width: 245px;
      height: 200px;
      margin-right: 15px;
      margin-bottom: 20px;
    }

    & button {
      position: absolute;
      top: 10px;
      left: 205px;
      width: 30px;
      height: 30px;
      /* border: 1px solid blue; */
      border: none;
      background-color: rgba(0, 0, 0, 0.601);
      color: white;
    }
  }
`;
export const FileDiv = styled.div`
  display: flex;
  /* border: 1px solid blue; */
  margin-top: 10px;
`;
