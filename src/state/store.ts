import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import AuthReducer from './auth/reducers';
import ChatReducer from './chat/reducers';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {ThunkAction} from 'redux-thunk/es/types';
import {ActionTypes as authActionTypes} from './auth/actions';
import {ActionTypes as chatActionTypes} from './chat/actions';

const rootReducer = combineReducers({
  profile: AuthReducer,
  chat: ChatReducer,
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>

type ActionTypes = chatActionTypes | authActionTypes;

export type ThunkActionType = ThunkAction<void, RootState, unknown, ActionTypes>;

type ActionProps<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<ActionProps<T>>

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware),
));

export default store;
