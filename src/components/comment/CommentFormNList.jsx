import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { createComment, __getComments } from '../../redux/modules/comments';
import EachCommentView from './EachCommentView';

const CommentFormNList = () => {
  const initialStateOfComment = {
    todoId: 0,
    id: 0,
    nickname: '',
    desc: '',
  };
  const [comment, setComment] = useState(initialStateOfComment);
  const params = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, comments } = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(__getComments());
  }, [dispatch]);

  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  const params_id = params.id;
  // const 로 선언한 commentList는 initialState같은 객체가 여러개 담겨있는 배열[]임.
  // 배열 안에서 todo의 id와 params_id가 같은 댓글들만 filter로 걸러 모아서 commentList에 담음
  // 밑에서 map으로 해당 todo의 댓글들만 뿌려줄것임.
  const commentsListOfThisTodo = comments.filter((comment) => {
      return String(comment.todoId) === params_id;
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, todoId: params_id, [name]: value });
  };

  const onSubmitComment = (e) => {
    e.preventDefault();
    dispatch(createComment({...comment, id: uuidv4()}));
    setComment(initialStateOfComment);
  };

  return (
    <StContainer>
      <Commentformcontainer>
        <hr></hr>
        <P>댓글</P>
        <Form onSubmit={onSubmitComment}>
          <NickNameInput
            required={true} //입력 안하고 제출하면 경고창 뜸 & 제출 안 됨!
            minLength={3}
            placeholder='이름 (5자 이내)'
            maxLength={5}
            type='text'
            name='nickname'
            value={comment.nickname} //input에 입력되어 있을 초깃값
            onChange={onChangeInput}
          />
          <ContentInput
            required={true}
            minLength={2}
            placeholder='댓글을 입력하세요. (100자 이내)'
            maxLength={100}
            type='text'
            name='desc'
            value={comment.desc}
            onChange={onChangeInput}
          />
          <Button>댓글달기</Button>
        </Form>
      </Commentformcontainer>
      {commentsListOfThisTodo.map((comment) => {
        return <EachCommentView comment={comment} key={comment.id} />;
      })}
      <footer></footer>
    </StContainer>
  );
};

export default CommentFormNList;

const StContainer = styled.div`
  /* background-color: #f7f8ff; */
  height: 400px;
  /* position: absolute; */
  bottom: 0px;
  left: 0px;
  width: 100%;
  transition: height 400ms ease-in-out;
  margin-top: 100px;
  footer {
    height: 1px;
  }
`;

const Commentformcontainer = styled.div`
  /* background-color: red; */
  flex-direction: row;
  hr {
    border: 1px solid #eee;
  }
`;

const Form = styled.form`
  /* background-color: green; */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-direction: row; */

  gap: 12px;
  width: 100%;
  padding-left: 30px;

  width: 90%;
  max-width: 1580px;
`;

const P = styled.p`
  margin: 16px;
`;

const NickNameInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 150px;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
  &:focus {
    box-shadow: 1px 1px 4px #c4c4c4;
  }
`;

const ContentInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 80%;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #eee;
  &:focus {
    box-shadow: 1px 1px 4px #c4c4c4;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-direction: row; */

  border: 1px solid #eee;
  background-color: #eee;
  height: 46px;
  border-radius: 8px;

  white-space: nowrap;

  &:hover {
    box-shadow: 1px 1px 4px #c4c4c4;
      /* box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
              3px 3px 5px rgba(0, 0, 0, 0.1); */
  }
`;