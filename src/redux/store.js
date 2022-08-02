import {applyMiddleware, combineReducers, createStore} from "redux";
import ProfileReducer from "./profile-reducer";
import ChatReducer from "./chat-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
  profile: ProfileReducer,
  chat: ChatReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.state = () => {
  return store.getState();
};

export default store;
