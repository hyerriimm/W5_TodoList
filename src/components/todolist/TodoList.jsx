import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Todo from "./Todo";
import { __getTodos } from "../../redux/modules/todos";

const TodosList = () => {
  const dispatch = useDispatch();
  const { isLoading, error, todos } = useSelector((state) => state.todos);
  console.log (todos);
  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (todos.length === 0) {
    return (
      <Stack>
        <div>할 일이 없네요!</div>
      </Stack>
    );
  }

  return (
    <StContainer>
      {todos?.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </StContainer>
  );
};

export default TodosList;

const Stack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  div{
  font-size: 18px;
  /* color: ;
  font-weight: ; */
  }
`;

const StContainer = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* padding: 0 30px; */
  margin: 0 auto;
`;