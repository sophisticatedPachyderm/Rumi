import socket from '../socketio.js';

let nextCompletedId = 0;  //when we set initial state, we need to update this

export const addCompleted = ({id, name, user, createdAt}) => {
  return {
    type: 'ADD_COMPLETED',
    id,
    name,
    user,
    createdAt
  };
};

const loadAllCompleted = function({completedList}) {
  return {
    type: 'ADD_ALL_COMPLETED', 
    id: nextCompletedId++,
    completedList
  };
};

export const getAllCompleted = () => {
  return dispatch => {
    socket.emit('get completeds');

    socket.on('sending completeds', completedTasks => {
      let formatted = completedTasks.map(item => {
        return {
          name: item.task.name,
          user: item.user.name,
          createdAt: item.createdAt,
          id: item.id
        };
      });
      console.log('get completedTasks', formatted);
      dispatch(loadAllCompleted({completedList: formatted}));
    });
  };
};