import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';

import { Comment, CommentInput, InsertBtn } from './detailComment.styled';

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
        comment.forEach(el => {
            arr.push(<Comment>{el.content}</Comment>)
            if (el.Recomments.length != 0) {
                el.Recomments.forEach((re)=>{
                    arr.push(<Comment>대댓글 : {re.re_content}</Comment>)
                })
            }
            arr.push(<><div style={{display: "flex"}}><CommentInput id={`recommentInput_${el.id}`}/><InsertBtn id={`recommentBtn_${el.id}`} onClick={(e)=>{recommentInsert(e)}}>대댓글 등록</InsertBtn></div></>);
        });

        return arr;
    }

  return (
    <div>{loop()}
    <div style={{display: "flex", marginTop : "40px"}}>
    <CommentInput id='commentInput'/><InsertBtn onClick={commentInsert}>댓글 등록</InsertBtn>
    </div>
    </div>
  )
}

export default DetailComment