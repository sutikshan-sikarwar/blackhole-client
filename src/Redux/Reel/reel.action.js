
import { api } from "../../config/api";
import {
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  CREATE_REEL_FAILURE,
  FETCH_REELS_REQUEST,
  FETCH_REELS_SUCCESS,
  FETCH_REELS_FAILURE,
  FETCH_USER_REELS_REQUEST,
  FETCH_USER_REELS_SUCCESS,
  FETCH_USER_REELS_FAILURE,
} from "./reel.actionType";



export const createReelAction = (reelData) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    const { data } = await api.post("/api/reels", reelData); // Adjust the endpoint as needed
    dispatch({ type: CREATE_REEL_SUCCESS, payload: data });
    console.log("created reel", data);
  } catch (error) {
    console.log("error", error);
    dispatch({ type: CREATE_REEL_FAILURE, payload: error });
  }
};


export const fetchReelsAction = () => async (dispatch) => {
    dispatch({ type: FETCH_REELS_REQUEST });
    try {
      const { data } = await api.get("/api/reels"); // Adjust the endpoint as needed
      dispatch({ type: FETCH_REELS_SUCCESS, payload: data });
      console.log("Fetched reels", data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: FETCH_REELS_FAILURE, payload: error });
    }
  };

// Action to fetch a user's reels by userId
export const fetchUserReelsAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USER_REELS_REQUEST });
    const response = await api.get(`/reels/user/${userId}`);
    dispatch({
      type: FETCH_USER_REELS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_REELS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
