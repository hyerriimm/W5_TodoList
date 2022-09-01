import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { VscArrowLeft } from "react-icons/vsc";

import Header from "../header/Header";
import { updateTodo, __getTodos } from '../../redux/modules/todos';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedTodobody, setUpdatedTodobody] = useState("");

  const { isLoading, error, todos } = useSelector((state) => state.todos);

  let todo = todos.find((todo) => {
    return String(todo.id) === id;
  });

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);


  const onSaveButton = () => {
    if (updatedTodobody.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    dispatch(
        updateTodo({
        ...todo,
        body: updatedTodobody,
      })
    );
    setIsEditMode(false);
  };
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
        {!isEditMode ? (
            <>
            <Header/>
            <StLayout>
            <StTodoHeader>
                <button onClick={() => {navigate('/');}}>
                    <VscArrowLeft size='16' color='rgb(68, 155, 255)'/>
                </button>
                <div>id: ({todo?.id})</div>
            </StTodoHeader>
            <Titlediv>{todo?.title}</Titlediv>
            <StBody>
                <div>{todo?.body}</div>
                <StButtonGroup>
                    <button onClick={()=>{setIsEditMode(true);}}>
                    할 일 수정하기
                    </button>
                </StButtonGroup>
            </StBody>
            </StLayout>
        </>
        ) : (
            <>
        <Header/>
        <StLayout>
            <StTodoHeader>
                <button onClick={() => {navigate(-1);}}>
                    <VscArrowLeft size='16' color='rgb(68, 155, 255)'/>
                </button>
                <div>id: ({todo?.id})</div>
            </StTodoHeader>
            <Titlediv>{todo?.title}</Titlediv>
            <StBody>
                <Textarea
                    name='body'
                    rows='10'
                    maxLength={200}
                    value={updatedTodobody}
                    onChange={(event) => {
                    setUpdatedTodobody(event.target.value);}}/>
            <StButtonGroup>
                <button onClick={onSaveButton}>
                    저장하기
                </button>
            </StButtonGroup>
            </StBody>
        </StLayout>
        </>
        )}
    </>
  );
};

export default Detail;

const StLayout = styled.div`
  /* height: calc(100vh - 45px); */
  height: 450px;
  background-color: #fff;
  padding: 24px;
`;

const StTodoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  div {
    font-size: 20px;
  }
  button{
    border: none;
    border-radius: 8px;
    height: 30px;
    width: 30px;
  }

  /* div:nth-child(2) {
    font-size: 24px;
    text-decoration: underline;
    color: teal;
    cursor: pointer;
  } */
  margin-bottom: 32px;
`;

const Titlediv = styled.div`
  font-size: 32px;
  font-weight: 700;
`

const StBody = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  flex-direction: column;

  margin-top: 50px;
  min-height: 400px;
  div {
    line-height: 1.5;
    font-size: 18px;
  }
`;

const StButtonGroup = styled.div`
  width: 100%;
  gap: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  button{
  color: rgb(68, 155, 255);
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 18px;
`;