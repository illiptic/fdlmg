import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import program from './reducers/program';
import example2 from './reducers/example2';

export default combineReducers({program, example2, routing: routerReducer})
