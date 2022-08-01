import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import ChatReducer from "./chat-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  profile: ProfileReducer,
  chat: ChatReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.state = () => {
  return store.getState();
};

export default store;
