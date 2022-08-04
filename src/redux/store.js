import {applyMiddleware, combineReducers, createStore} from "redux";
import AuthReducer from "./auth-reducer";
import ChatReducer from "./chat-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
  profile: AuthReducer,
  chat: ChatReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.state = () => {
  return store.getState();
};

export default store;
