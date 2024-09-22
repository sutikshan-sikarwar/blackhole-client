import { api } from "../../config/api";
import { CREATE_STORY_FAILURE, CREATE_STORY_REQUEST, CREATE_STORY_SUCCESS, FETCH_STORIES_FAILURE, FETCH_STORIES_REQUEST, FETCH_STORIES_SUCCESS, FETCH_USER_STORIES_FAILURE, FETCH_USER_STORIES_REQUEST, FETCH_USER_STORIES_SUCCESS } from "./story.actionType";

export const createStoryAction = (storyData) => async (dispatch) => {
    dispatch({ type: CREATE_STORY_REQUEST });
    try {
      const { data } = await api.post("/api/story", storyData); // Adjust the endpoint as needed
      dispatch({ type: CREATE_STORY_SUCCESS, payload: data });
      console.log("created reel", data);
    } catch (error) {
      console.log("error", error);
      dispatch({ type: CREATE_STORY_FAILURE, payload: error });
    }
  };
  
  
  export const fetchStoriesAction = () => async (dispatch) => {
      dispatch({ type: FETCH_STORIES_REQUEST });
      try {
        const { data } = await api.get("/api/story"); // Adjust the endpoint as needed
        dispatch({ type: FETCH_STORIES_SUCCESS, payload: data });
        console.log("Fetched reels", data);
      } catch (error) {
        console.log("error", error);
        dispatch({ type: FETCH_STORIES_FAILURE, payload: error });
      }
    };
  

  export const fetchUserStoriesAction = (userId) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_USER_STORIES_REQUEST });
      const response = await api.get(`api/story/user/${userId}`);
      dispatch({
        type: FETCH_USER_STORIES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_STORIES_FAILURE,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
  