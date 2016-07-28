import { combineReducers } from 'redux';
import completedList from './completedList';
import tasks from './tasks';

const appReducer = combineReducers({
  completedList,
  tasks
});

export default appReducer;