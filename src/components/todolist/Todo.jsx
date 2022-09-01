import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { VscTrash } from "react-icons/vsc";
import { deleteTodo } from '../../redux/modules/todos';

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <StTodo
      onClick={() => {
        navigate(`/detailtodo/${todo.id}`);
      }}
    >
      <Stack>
        <div>{todo.title}</div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            const result = window.confirm("이 할일을 지울까요?");
            if (result) {
              return onDeleteTodo();
            } else {
              return;
            }
          }}
        >
          <VscTrash color="#FE531F" />
        </button>
      </Stack>
      <Wrapper>
        <Stack>작성자 : {todo.writer}</Stack>
      </Wrapper>
    </StTodo>
  );
};

export default Todo;

const StTodo = styled.div`
  padding: 12px;
  height: 90px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
`;

const Stack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  div{
  font-size: 20px;
  /* color: ;
  font-weight: ; */
  }

  button {
  border: 1px solid #eee;
  background-color: #fff;
  height: 46px;
  border-radius: 8px;
  /* background-color: ${({ bgColor, disabled }) => (disabled ? "#ddd" : bgColor)}; */
  cursor: pointer;
  width: 30px;
  height: 30px !important;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 10px 0 ;
`;