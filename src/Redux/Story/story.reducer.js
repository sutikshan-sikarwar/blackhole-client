import {
    CREATE_STORY_REQUEST,
    CREATE_STORY_SUCCESS,
    CREATE_STORY_FAILURE,
    FETCH_STORIES_REQUEST,
    FETCH_STORIES_SUCCESS,
    FETCH_STORIES_FAILURE,
    FETCH_USER_STORIES_REQUEST,
    FETCH_USER_STORIES_SUCCESS,
    FETCH_USER_STORIES_FAILURE,
  } from './story.actionType';
  
  const initialState = {
    stories: [],
    userStories: [],
    loading: false,
    error: null,
  };
  
  export const storiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_STORY_REQUEST:
      case FETCH_STORIES_REQUEST:
      case FETCH_USER_STORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CREATE_STORY_SUCCESS:
        return {
          ...state,
          stories: [...state.stories, action.payload],
          loading: false,
        };
  
      case FETCH_STORIES_SUCCESS:
        return {
          ...state,
          stories: action.payload,
          loading: false,
        };
  
      case FETCH_USER_STORIES_SUCCESS:
        return {
          ...state,
          userStories: action.payload,
          loading: false,
        };
  
      case CREATE_STORY_FAILURE:
      case FETCH_STORIES_FAILURE:
      case FETCH_USER_STORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  