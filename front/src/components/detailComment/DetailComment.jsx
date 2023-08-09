import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';

import { Comment, Recomment, InputDiv, CommentInput, InsertBtn } from './detailComment.styled';

const DetailComment = ({estateId, comment, queryClient}) => {
    let comment_id;

    const createMutation = useMutation(async (comment)=>{
        console.log("댓글작성",comment);
        const { data } = await axios.post("http://localhost:8080/detail/postComment", comment, {
            withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("댓글 작성 성공");
                document.querySelector("#commentInput").value = "";

                queryClient.invalidateQueries('estate');
            } else {
                console.log("오류",data);
                alert("오류 발생");
            }
        }
    });

    // 댓글 등록 클릭하면 실행되는 함수
    const commentInsert = () => {
        if (document.querySelector("#commentInput").value.trim() == "") {
            alert("내용을 작성하세요.");
            return;
        }
        createMutation.mutate({ real_estate_id : estateId, content : document.querySelector("#commentInput").value });
    }


    const createRecommentMutation = useMutation(async (recomment)=>{
        const { data } = await axios.post("http://localhost:8080/detail/postRecomment", recomment, {
            withCredentials : true
        });
        return data;
    }, {
        onSuccess : (data) => {
            if (data.message && data.message == "성공") {
                console.log("대댓글 작성 성공");
                document.querySelector(`#recommentInput_${comment_id}`).value = "";

                queryClient.invalidateQueries('estate');

            } else {
                alert("오류 발생");
            }
        }
    });

    // 대댓글 등록 클릭하면 실행되는 함수
    const recommentInsert = (e) => {
        comment_id = Number(e.target.id.split("_")[1])
        if (document.querySelector(`#recommentInput_${comment_id}`).value.trim() == "") {
            alert("내용을 작성하세요.");
            return;
        }

        createRecommentMutation.mutate({ comment_id, re_content : document.querySelector(`#recommentInput_${comment_id}`).value });
    }


    const loop = () => {
        let arr = [];

        // 댓글/대댓글 등록 취소 버튼 클릭
        const commentClick = (e) => {
            let inputDiv = document.querySelector(`#${"recommentInputDiv_"+e.target.id.split("_")[1]}`);
            if (inputDiv.style.display == "none") {
                // 대댓글 입력창 보이게
                inputDiv.style.display = "flex";
            } else {
                // 대댓글 입력창 안보이게
                inputDiv.style.display = "none";
            }
        }

        comment.forEach(el => {
            arr.push(<Comment onClick={(e)=>{commentClick(e)}} id={`comment_${el.id}`}>{el.content} 작성자 : {el.User.user_name}</Comment>)
            if (el.Recomments.length != 0) {
                el.Recomments.forEach((re)=>{
                    arr.push(<Recomment>대댓글 : {re.re_content} 작성자 : {re.User.user_name}</Recomment>)
                })
            }
            arr.push(<><InputDiv id={`recommentInputDiv_${el.id}`}>
                <CommentInput placeholder='대댓글을 입력하세요.' id={`recommentInput_${el.id}`}/>
                <InsertBtn id={`recommentBtn_${el.id}`} onClick={(e)=>{recommentInsert(e)}}>등록</InsertBtn>
                <InsertBtn id={`recommentBtn_${el.id}`} onClick={(e)=>{commentClick(e)}}>취소</InsertBtn>
                </InputDiv></>);
        });

        return arr;
    }

  return (
    <div>
        <h3>댓글</h3>
    {loop()}
    <InputDiv style={{marginTop : "40px", display : "flex"}}>
    <CommentInput placeholder='댓글을 입력하세요.' id='commentInput'/><InsertBtn onClick={commentInsert}>등록</InsertBtn>
    </InputDiv>
    </div>
  )
}

export default DetailComment