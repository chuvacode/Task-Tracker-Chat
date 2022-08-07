import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import AuthReducer from './auth/reducers';
import ChatReducer from './chat/reducers';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  profile: AuthReducer,
  chat: ChatReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware),
));

export default store;
