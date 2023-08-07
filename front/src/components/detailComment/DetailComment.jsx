import React from 'react'
import axios from 'axios'
import { useMutation } from 'react-query';

import { Comment, CommentInput, InsertBtn } from './detailComment.styled';

const DetailComment = ({comment}) => {
    console.log(comment);

    const createMutation = useMutation(async (comment)=>{
        const { data } = await axios.post("http://localhost:8080/detail/postComment", comment, {
            withCredentials : true
        });
        return data;
    });

    const commentInsert = () => {
        createMutation.mutate({ real_estate_id : comment.real_estate_id, content : document.querySelector("#commentInput").value });
    }


    const createRecommentMutation = useMutation(async (recomment)=>{
        const { data } = await axios.post("http://localhost:8080/detail/postRecomment", recomment, {
            withCredentials : true
        });
        return data;
    });

    const recommentInsert = (e) => {
        let comment_id = Number(e.target.id.split("_")[1])
        createRecommentMutation.mutate({ comment_id, content : document.querySelector(`#recommentInput_${comment_id}`).value });
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
            arr.push(<><CommentInput id={`recommentInput_${el.id}`}/><InsertBtn id={`recommentBtn_${el.id}`} onClick={(e)=>{recommentInsert(e)}}>등록</InsertBtn></>);
        });

        return arr;
    }

  return (
    <div>{loop()}
    <div style={{display: "flex"}}>
    <CommentInput id='commentInput'/><InsertBtn onClick={commentInsert}>등록</InsertBtn>
    </div>
    </div>
  )
}

export default DetailComment