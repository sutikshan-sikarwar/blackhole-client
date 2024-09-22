import { api } from "../../config/api";
import {
  CREATE_COMMENT_FALIURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_POST_FALIURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FALIURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FALIURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FALIURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  SAVE_POST_FALIURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    const { data } = await api.post("/api/posts", postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    console.log("created post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_POST_FALIURE, payload: error });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get("/api/posts");
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    console.log("get all post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_ALL_POST_FALIURE, payload: error });
  }
};

export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
    console.log("get users post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: GET_USERS_POST_FALIURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/like/${postId}`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("like post", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: LIKE_POST_FALIURE, payload: error });
  }
};

export const createCommentAction=(reqData)=>async(dispatch)=>{
  dispatch({type:CREATE_COMMENT_REQUEST});
  try {
      const {data} = await api.post(`/api/comments/posts/${reqData.postId}`,reqData.data)
      dispatch({type:CREATE_COMMENT_SUCCESS, payload:data})
      console.log("created comment", data)
      
  } catch (error) {
      console.log("error",error)
      dispatch({type:CREATE_COMMENT_FALIURE,payload:error})
  }
}

export const savePostAction = (postId) => async (dispatch) => {
  dispatch({ type: SAVE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/save/${postId}`);
    dispatch({ type: SAVE_POST_SUCCESS, payload: data });
    console.log("post save krli bc....", data);
  } catch (error) {
    console.log("error aa gaya post save krne me", error);
    dispatch({ type: SAVE_POST_FALIURE, payload: error });
  }
};
