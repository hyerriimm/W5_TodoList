import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { deleteComment, updateComment } from '../../redux/modules/comments';
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import styled from 'styled-components';

const EachCommentView = ({ comment }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedDesc, setUpdatedDesc] = useState('');

  const { desc } = useSelector((state) => state.comments.comments);

  useEffect(() => {
    setUpdatedDesc(desc);
  }, [desc]);

  const onCancelBtn = () => {
    setIsEdit(false);
  };

  const onUpdateBtn = () => {
    const result = window.confirm('수정된 댓글을 저장하시겠습니까?');
    if (result) {
      dispatch(
        updateComment({
          todoId: comment.todoId,
          id: comment.id,
          nickname: comment.nickname,
          desc: updatedDesc,
        })
      );
      setIsEdit(false);
    } else {
      return;
    }
  };

  const onChangeEditBtn = () => {
    setIsEdit(true);
  };

  const onDeleteBtn = () => {
    const result = window.confirm('댓글을 삭제하시겠습니까?');
    if (result) {
      dispatch(deleteComment(comment.id));
    } else {
      return;
    }
  };

  return (
    <>
      {isEdit ? (
        <>
          <Container key={comment.id}>
            <ContentInput
              required={true}
              minLength={2}
              placeholder='수정할 댓글을 입력하세요. (100자 이내)'
              maxLength={100}
              type='text'
              name='desc'
              value={updatedDesc}
              onChange={(event) => {
                setUpdatedDesc(event.target.value);
              }}
            />
            <StControlGroup>
              <StButton
                //   disabled={isGlobalEditmode}
                onClick={onCancelBtn}
              >
                취소
              </StButton>
              <StButton
                //   disabled={isGlobalEditmode}
                onClick={onUpdateBtn}
              >
                저장
              </StButton>
            </StControlGroup>
          </Container>
          <StHr></StHr>
        </>
      ) : (
        <>
          <Container key={comment.id}>
            <Stcommentdiv>
              <h6>{comment.nickname}</h6>
              <p>{comment.desc}</p>
            </Stcommentdiv>
            <StControlGroup>
              <StButton
                //   disabled={isGlobalEditmode}
                onClick={onChangeEditBtn}
              >
                <VscEdit size='16' color='#fff' />
              </StButton>
              <StButton
                //   disabled={isGlobalEditmode}
                onClick={onDeleteBtn}
              >
                <VscTrash size='16' color='#fff' />
              </StButton>
            </StControlGroup>
          </Container>
          <StHr></StHr>
        </>
      )}
    </>
  );
};

export default EachCommentView;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* justify-content: center; */
  /* flex-direction: row; */
  width: 100%;
  /* flex-shrink: 0; */
  /* gap: 3px; */
  /* background-color: aliceblue; */

  padding: 12px 12px;
  margin: 12px 12px;
  /* border: 1px solid #eee; */
  border-radius: 8px;
  width: 90%;
  max-width: 1495px;
`;

const Stcommentdiv = styled.div`
  /* background-color: lightblue; */
  padding: 0 12px;
  display: row;
  hr {
    border: 1px solid #eee;
  }
  h6 {
    margin: 5px 5px;
  }
  p {
    font-weight: normal;
    margin: 0 5px;
  }
`;

const StControlGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  flex-shrink: 0;
  gap: 3px;
`;

const ContentInput = styled.input`
  box-sizing: border-box;
  height: 46px;
  width: 600px;
  outline: none;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #c3d6ff;
  &:focus {
    box-shadow: 1px 1px 4px #c4c4c4;
  }
`;

const StButton = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  border: 1px solid rgb(68, 155, 255);
  border-radius: 8px;
  background-color: rgb(68, 155, 255);
  cursor: pointer;
  width: 30px;
  height: 30px !important;

  white-space: nowrap;

  font-size: 13px;
  color: #fff;
  font-weight: bold;

  &:hover {
    box-shadow: 2px 2px 4px #c4c4c4;
  }
`;

const StHr = styled.hr`
  border: 1px solid #eee;
  margin-left: 30px;
  margin-right: 20%;
  width: 1500px;
  max-width: 90%;
`;