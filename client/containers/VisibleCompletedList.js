// NOT USED!!

// import { connect } from 'react-redux';
// import { addCompleted } from '../actions/completedActions';
// import CompletedList from '../CompletedList.jsx';
// import socket from '../socketio.js';


// const mapStateToProps = (state) => {
//   return {
//     completedList: state.completedList
//   };
// };

// // const socketHandler = (dispatch) => {
// //   socket.emit('get completeds');
// //   socket.on('sending completeds', completedTasks => {
// //     completedTasks.forEach(task => {
// //       dispatch(addCompleted(task));
// //     });
// //   });
// // };

// const testDispatch = (dispatch) => {
//   return {
//     onClick: (id) => {
//       dispatch(addCompleted({name: 'Big Task', user: 'Duke', due: 'tomorrow' }));
//     }
//   };
// };


// const VisibleCompletedList = connect(
//   mapStateToProps,
//   testDispatch
// )(CompletedList);

// export default VisibleCompletedList;