const completed = (state, action) => {

  switch (action.type) {

  case 'ADD_COMPLETED':
    return {
      id: action.id,
      name: action.name,
      user: action.user,
      due: action.due,
    };
  default:
    return state;
  }
};


const completedList = (state = [], action) => {
  switch (action.type) {

  case 'ADD_COMPLETED':
    return [
      ...state, completed(undefined, action)
    ];
  case 'ADD_ALL_COMPLETED':
    return action.completedList;
  default:
    return state;
  }
};

export default completedList;