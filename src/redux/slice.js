import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts: [],
  loader: false,
};
const BASE_URL = "https://637638f081a568fc25f90df1.mockapi.io/Posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  const response = await axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
  const data = response.data;
  return { data, id };
});
export const savePost = createAsyncThunk("posts/savePost", async (post) => {
  await axios({
    url: BASE_URL,
    method: "POST",
    data: post,
  });
  const newResponse = await axios.get(BASE_URL);
  return newResponse.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loader = false;
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loader = false;
        const { id } = action.payload;

        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(savePost.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.loader = false;
        state.posts = action.payload;
      });
  },
});

export const allPosts = (state) => state.posts.posts;
export const loadingState = (state) => state.posts.loader;

export default postsSlice.reducer;
