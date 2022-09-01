import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/header/Header';
import TodosList from '../components/todolist/TodoList';

function Home() {
  let navigate = useNavigate();
  return (
    <>
      <Header />
      <Title>😤갓생살기 프로젝트👩‍💻</Title>
      <ButtonDiv>
        <button onClick={() => navigate('/writetodo')}>Todo 추가하기</button>
      </ButtonDiv>
      <TodosList />
    </>
  );
}

export default Home;

const Title = styled.h1`
 display: flex;
  justify-content: center;
   align-items: center;
   margin-bottom: 0;
`;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  
  button{
    border: none;
    background-color: rgb(68, 155, 255);
    border-radius: 20px;
    margin: 20px 0;
    color: white;
    font-weight: bold;
    font-size: large;
    height: 40px;
    width: 150px;
    /* white-space: nowrap; */
    &:hover{
      box-shadow: 1px 1px 4px #a7a7a7;
      
  }
}
`;
