const task = (state, action) => {
  switch (action.type) {

  case 'ADD_TASK':
    return {
      id: action.id,
      name: action.name,
      // completed: false,  //do we need this?
      dueBy: action.dueBy,
      interval: action.interval
      //state:  recent, urgent, overdue??
    };
  case 'COMPLETE_TASK':
    if (state.id !== action.id) {
      return state;
    }

    return Object.assign({}, state, {
      //dueBy: dateNow + interval
    });
  default:
    return state;
  }
};

const tasks = (state = [], action) => {
  switch (action.type) {

  case 'ADD_TASK':
    return [
      ...state, task(undefined, action)
    ];
  case 'COMPLETE_TASK':
    return state.map(t =>
      task(t, action)  
    );
  case 'ADD_ALL_TASKS':
    return action.tasks;
    // return {
    //   overdueTasks: action.overdueTasks, 
    //   urgentTasks: action.urgentTasks, 
    //   recentTasks: action.recentTasks 
    // };
  default:
    return state;
  }
};

export default tasks;