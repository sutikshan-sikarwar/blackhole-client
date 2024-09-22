import { api } from "../../config/api";
import * as actionType from "./message.actionType";

export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(`/api/messages/chat/${reqData.message.chatId}`, reqData.message);
    reqData.sendMessageToServer(data)
    console.log("message ban gaya", data);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("ye hai create message ka error", error);
    dispatch({
      type: actionType.CREATE_MESSAGE_FALIURE,
      payload: error,
    });
  }
};

export const createChat = (chat) => async (dispatch) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST });
    try {
      const { data } = await api.post(`/api/chats`, chat);
      console.log("chat ban gayi", data);
      dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
      console.log("ye hai create chat ka error", error);
      dispatch({
        type: actionType.CREATE_CHAT_FALIURE,
        payload: error,
      });
    }
  };

  export const getAllChats = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
    try {
      const { data } = await api.get(`/api/chats`);
      console.log("ye rahi saari chats", data);
      dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
    } catch (error) {
      console.log("saari chats nahi mil rahi", error);
      dispatch({
        type: actionType.GET_ALL_CHATS_FALIURE,
        payload: error,
      });
    }
  };