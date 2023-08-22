import React from "react";
import axios from "../../Axios";
import { useMutation } from "react-query";

import { Comment, Recomment, InputDiv, CommentInput, InsertBtn, H1, CommentDiv, UserImg, Date } from "./detailComment.styled"
import { detail_arrow, userimg } from "../../img";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "components/serverURL";
import { useAuth } from "AuthContext";

const DetailComment = ({ estateId, comment, queryClient }) => {
  let comment_id;
  const nav = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const createMutation = useMutation(
    async (comment) => {
      const { data } = await axios.post(
        "/detail/postComment",
        comment,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        if (data.message && data.message == "성공") {
          document.querySelector("#commentInput").value = "";

          queryClient.invalidateQueries("estate");
        } else if (data.message && data.message == "다시 로그인") {
          alert("로그인 하세요.");
          logout();
          nav("/login");
        } else {
          alert("오류 발생");
        }
      },
    }
  );

  // 댓글 등록 클릭하면 실행되는 함수
  const commentInsert = () => {
    if (!isLoggedIn) {
      alert("로그인하세요.");
      return;
    }

    if (document.querySelector("#commentInput").value.trim() == "") {
      alert("내용을 작성하세요.");
      return;
    }
    createMutation.mutate({
      real_estate_id: estateId,
      content: document.querySelector("#commentInput").value,
    });
  };

  const createRecommentMutation = useMutation(
    async (recomment) => {
      const { data } = await axios.post(
        "/detail/postRecomment",
        recomment,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        if (data.message && data.message == "성공") {
          document.querySelector(`#recommentInput_${comment_id}`).value = "";

          queryClient.invalidateQueries("estate");
        } else if (data.message && data.message == "다시 로그인") {
          alert("로그인 하세요.");
          nav("/login");
          logout();
        } else {
          alert("오류 발생");
        }
      },
    }
  );

  // 대댓글 등록 클릭하면 실행되는 함수
  const recommentInsert = (id) => {
    comment_id = id;
    if (!isLoggedIn) {
      alert("로그인하세요.");
      return;
    }
    if (
      document.querySelector(`#recommentInput_${comment_id}`).value.trim() == ""
    ) {
      alert("내용을 작성하세요.");
      return;
    }

    createRecommentMutation.mutate({
      comment_id,
      re_content: document.querySelector(`#recommentInput_${comment_id}`).value,
    });
  };

  const loop = () => {
    let arr = [];

    // 댓글 클릭, 대댓글 등록 취소 버튼 클릭
    const commentClick = (id) => {
      comment_id = id;

      let inputDiv = document.querySelector(
        `#${"recommentInputDiv_" + comment_id}`
      );
      if (inputDiv.style.display == "none") {
        // 대댓글 입력창 보이게
        inputDiv.style.display = "flex";
      } else {
        // 대댓글 입력창 안보이게
        inputDiv.style.display = "none";
      }
    };

    comment.forEach((el) => {
      // 댓글 출력
      arr.push(
        <Comment
          onClick={(e) => {
            commentClick(el.id);
          }}
          id={`comment_${el.id}`}
        >
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px", marginBottom: "10px" }}>
            {el.User.user_img ?
              <UserImg src={`${serverUrl}user_imgs/` + el.User.user_img?.substr(13)} />
              :
              <UserImg src={`${serverUrl}user_imgs/User_Profile.png`} />
            }{" "}
            {el.User.user_name}
          </div>
          {el.content}
          <Date>{el.createdAt}</Date>
        </Comment>
      );

      // 대댓글 출력
      if (el.Recomments.length !== 0) {
        el.Recomments.forEach((re) => {
          arr.push(
            <Recomment>
              <img src={detail_arrow}></img>
              <div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  {re.User.user_img ?
                    <UserImg src={`${serverUrl}user_imgs/` + re.User.user_img?.substr(13)} />
                    :
                    <UserImg src={`${serverUrl}user_imgs/User_Profile.png`} />
                  }
                  {" "}
                  {re.User.user_name}
                </div>
                {re.re_content}
                <Date>{re.createdAt}</Date>
              </div>
            </Recomment>
          );
        });
      }

      arr.push(
        <>
          <InputDiv id={`recommentInputDiv_${el.id}`}>
            <CommentInput
              placeholder={el.User.user_name + "님에게 대댓글 달기"}
              id={`recommentInput_${el.id}`}
            />
            <InsertBtn
              id={`recommentBtn_${el.id}`}
              onClick={(e) => {
                recommentInsert(el.id);
              }}
            >
              등록
            </InsertBtn>
            <InsertBtn
              id={`recommentBtn_${el.id}`}
              onClick={(e) => {
                commentClick(el.id);
              }}
              border = {"4px solid rgba(0,0,0,0.3)"}
            >
              취소
            </InsertBtn>
          </InputDiv>
        </>
      );
    });

    return arr;
  };

  return (
    <div>
      <H1>댓글</H1>
      <CommentDiv>{loop()}</CommentDiv>
      <InputDiv style={{ marginTop: "40px", display: "flex" }}>
        <CommentInput placeholder="댓글을 입력하세요." id="commentInput" />
        <InsertBtn onClick={commentInsert}>등록</InsertBtn>
      </InputDiv>
    </div>
  );
};

export default DetailComment;
