const completed = (state, action) => {

  switch (action.type) {

  case 'ADD_COMPLETED':
    return {
      id: action.id,
      name: action.name,
      user: action.user,
      createdAt: action.createdAt,
    };
  default:
    return state;
  }
};


const completedList = (state = [], action) => {
  switch (action.type) {

  case 'ADD_COMPLETED':
    return [
      completed(undefined, action), ...state
    ];
  case 'ADD_ALL_COMPLETED':
    return action.completedList;
  default:
    return state;
  }
};

export default completedList;