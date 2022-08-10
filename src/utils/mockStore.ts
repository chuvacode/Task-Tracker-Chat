import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {RootState} from '../state/store';

export const mockStore = configureMockStore<RootState>([thunk]);
