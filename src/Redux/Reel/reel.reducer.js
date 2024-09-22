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
  } from './reel.actionType';
  
  const initialState = {    
    reels: [],
    userReels: [],
    loading: false,
    error: null,
  };
  
  // Reels reducer
  export const reelsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REEL_REQUEST:
      case FETCH_REELS_REQUEST:
      case FETCH_USER_REELS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_REEL_SUCCESS:
        return {
          ...state,
          reels: [...state.reels, action.payload],
          loading: false,
        };
      case FETCH_REELS_SUCCESS:
        return {
          ...state,
          reels: action.payload,
          loading: false,
        };
      case FETCH_USER_REELS_SUCCESS:
        return {
          ...state,
          userReels: action.payload,
          loading: false,
        };
      case CREATE_REEL_FAILURE:
      case FETCH_REELS_FAILURE:
      case FETCH_USER_REELS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  