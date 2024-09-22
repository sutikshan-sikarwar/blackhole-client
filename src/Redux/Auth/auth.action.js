import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

export const loginUserAction = (loginData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("Login successful:", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("Login error:", error.response?.data?.message || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Register Action
export const registerUserAction = (registerData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    console.log("Register Data:", registerData); 
    const headers = {
      "Content-Type": "application/json", 
    };

    const { profilePic, gender, firstName, lastName, email, password } = registerData;

    const payload = {
      firstName,
      lastName,
      email,
      password,
      profilePic,   
      gender        
    };

    
    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      payload,
      { headers }
    );

    if (data.token) {
      localStorage.setItem("jwt", data.token);
    }
    console.log("Successfully registered-----", data);

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log(
      "Error details:",
      error.response?.data,
      error.message,
      error.config
    );
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getProfileAction = (jwt) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {headers:{"Authorization":`Bearer ${jwt}`}}
      
    );
    console.log("profile data-----", data);
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error
    });
  }
};


export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await api.put(
      `${API_BASE_URL}/api/users`,
      reqData,
    );
    console.log("update profile-----", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error
    });
  }
};


export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    
    const { data } = await api.get(`/api/users/search?query=${query}`, {
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    console.log("search user -----", data);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.log("-----", error);
    dispatch({
      type: SEARCH_USER_FAILURE,
      payload: error
    });
  }
};


export const fetchUsers = () => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const { data } = await api.get(`${API_BASE_URL}/api/users`);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
