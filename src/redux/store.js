import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import AuthReducer from "./auth-reducer";
import ChatReducer from "./chat-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

let reducers = combineReducers({
  profile: AuthReducer,
  chat: ChatReducer,
  form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

export default store;
