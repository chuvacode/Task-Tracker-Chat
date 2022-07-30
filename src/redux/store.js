import {combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import ChatReducer from "./chat-reducer";

let reducers = combineReducers({
  profile: ProfileReducer,
  chat: ChatReducer,
});

let store = createStore(reducers);

window.state = () => {
  return store.getState();
};

export default store;
