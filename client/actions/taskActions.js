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

const loadAllTasks = ({tasks}) => {
  return {
    type: 'ADD_ALL_TASKS',
    id: nextTaskId++,
    tasks
  };
};

export const getAllTasks = () => {
  // setInterval(reprioritizeTasks, 1000 * 60);  //update every minute
  return dispatch => {
    socket.emit('get all tasks');
    socket.on('sending all tasks', tasks => {
      // var t = urgency.prioritizeTasks(tasks);
      // console.log('reprioritize tasks:', t);

      // dispatch(loadAllTasks({t}));
      dispatch(loadAllTasks({tasks}));
    });
  };
};

// setInterval(() => {
//   this.setState({now: Date.now()});

//   let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
//   this.reprioritize(allTasks);
// }, 1000 * 60); // update every minute