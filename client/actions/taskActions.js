import socket from '../socketio.js';
import urgency from '../urgency.service';

let nextTaskId = 0;  //when we set initial state, we need to update this

const addTask = ({name, interval}) => {
  return {
    type: 'ADD_TASK',
    id: nextTaskId++,
    name,
    interval,
    dueBy: Date.now() + interval
  };
};

export const completeTask = (id) => {
  return {
    type: 'COMPLETE_TASK',
    id
  };
};

const loadAllTasks = ({t}) => {
  return {
    type: 'ADD_ALL_TASKS',
    id: nextTaskId++,
    overdueTasks: t.overdue,
    urgentTasks: t.urgent,
    recentTasks: t.recent
  };
};

export const createTask = ({taskName, dueDate, interval}) => {
  var createListenerOn = false;
  return dispatch => {

    socket.emit('create task', {
      name: taskName,
      dueBy: dueDate,
      interval: interval
    });

    if (!createListenerOn) {
      createListenerOn = true;
      socket.on('create task', newTask => {
        console.log('create task response', newTask);
      });
    }
  };
};

// const reprioritizeTasks = () => {
//   return {
//     type: 'REFRESH_PRIORITY',
//     id: nextTaskId++,
//     overdueTasks: t.overdue,
//     urgentTasks: t.urgent,
//     recentTasks: t.recent
//   };
// };

export const getAllTasks = () => {
  // setInterval(reprioritizeTasks, 1000 * 60);  //update every minute
  return dispatch => {
    socket.emit('get all tasks');
    socket.on('sending all tasks', tasks => {
      var t = urgency.prioritizeTasks(tasks);
      console.log('reprioritize tasks:', t);

      dispatch(loadAllTasks({t}));
    });
  };
};

// setInterval(() => {
//   this.setState({now: Date.now()});

//   let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
//   this.reprioritize(allTasks);
// }, 1000 * 60); // update every minute