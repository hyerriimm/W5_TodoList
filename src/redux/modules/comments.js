import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getComments = createAsyncThunk(
  "comments/getComments",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/comments");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const comments = createSlice({
  name: 'comments', //이 모듈의 이름
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: { // 이 모듈의 Reducer 로직
    // 리듀서 안에 만든 함수 자체가 리듀서 로직이자, Action creator가 된다 ✨
    createComment(state, action) {
      state.comments.push(action.payload);
      axios.post("http://localhost:3001/comments",action.payload);
    },

    deleteComment(state, action) {
      let index = state.comments.findIndex(
        (comment) => comment.id === action.payload //payload는 comment의 id임
      );
      state.comments.splice(index, 1);
      axios.delete(`http://localhost:3001/comments/${action.payload}`);
    },

    updateComment(state, action) {
      let index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id //payload는 수정된 comment객체 하나 postId, id, nickname, desc(수정)
      );
      state.comments.splice(index, 1, action.payload); // state에서 인덱스가 일치하는거 하나 제거하고 payload넣어라
      axios.patch(`http://localhost:3001/comments/${action.payload.id}`,action.payload);
    },
  },
  extraReducers: {
    [__getComments.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getComments.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__getComments.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export let { createComment, deleteComment, updateComment } = comments.actions;
// Action Creator를 내보내주기

export default comments;