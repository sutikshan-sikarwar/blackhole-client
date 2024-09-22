import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { postReducer } from "./Post/post.reducer";
import { messageReducer } from "./Message/message.reducer";
import { reelsReducer } from "./Reel/reel.reducer";
import { storiesReducer } from "./Story/story.reducer";

const rootReducers = combineReducers({
    auth:authReducer,
    post:postReducer,
    message:messageReducer,
    reel:reelsReducer,
    story:storiesReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));