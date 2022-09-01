import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";

import { createTodo } from '../../redux/modules/todos';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const initialState = {
    id: 0,
    writer: '',
    title: '',
    body: '',
  };

  const [todo, setTodo] = useState(initialState);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({...todo, [name]: value,});
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // if (todo.writer.trim() === '' || todo.title.trim() === '' || todo.body.trim() === '') {
    //   return alert('모든 항목을 입력해주세요.');
    // }
    dispatch(createTodo({...todo, id: uuidv4()}));
    setTodo(initialState);
    navigate('/');
  };

  return (
    <StContainer>
      <StForm onSubmit={onSubmitHandler}>
        <StMain>
          <Wrapper>
            <div>작성자</div>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            value={todo.username}
            name="writer"
            required = {true}
            placeholder="작성자의 이름을 입력해주세요. (5자 이내)"
            minLenth={3}
            maxLength={5}
          />
          <Wrapper>
            <div>제목</div>
          </Wrapper>
          <Input
            type="text"
            onChange={onChangeHandler}
            value={todo.title}
            name="title"
            required = {true}
            placeholder="제목을 입력해주세요. (50자 이내)"
            minLenth={3}
            maxLength={50}
          />
          <Wrapper>
            <div>내용</div>
          </Wrapper>
          <Textarea
            onChange={onChangeHandler}
            value={todo.body}
            name="body"
            required = {true}
            placeholder="내용을 입력해주세요. (200자 이내)"
            rows="10"
            maxLength={200}
          />
        </StMain>
        <TodoAddButton size="large">추가하기</TodoAddButton>
      </StForm>
    </StContainer>
  );
};

export default Form;

const StContainer = styled.div`
  height: 100%;
`;

const StForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  div {
    display: flex;
  align-items: start;
  justify-content: between;
  flex-direction: column;
  }
`;

const StMain = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0 ;
  div{
    font-size: 24px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 100%;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid #eee;
  padding: 12px;
  font-size: 14px;

  box-sizing: border-box;
  outline: none;
`;

const TodoAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  color: rgb(68, 155, 255);
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%
`;
