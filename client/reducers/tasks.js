const task = (state, action) => {
  switch (action.type) {

  case 'ADD_TASK':
    return action.data;
  case 'COMPLETE_TASK':
    return Object.assign({}, state, {
      dueBy: action.dueBy,
      updatedAt: action.updatedAt
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
    return state.map(t => {
      if (t.id === action.id) {
        return task(t, action);  
      } else {
        return t;
      }
    });
  case 'ADD_ALL_TASKS':
    return action.tasks;
  default:
    return state;
  }
};

export default tasks;