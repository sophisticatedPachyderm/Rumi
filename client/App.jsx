import React from 'react';
import ReactDOM from 'react-dom';

// Necessary for Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Necessary for simple Mobile/Web click functionality on components
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Provides 'a few seconds ago' and 'in 2 hours' to time Data
import moment from 'moment';

// Components we have built
import Navbar from './Navbar.jsx';
// import Task from './Task.jsx';
import CompletedList from './components/CompletedList.jsx';
import OverdueTasks from './components/OverdueTasks.jsx';
import UrgentTasks from './components/UrgentTasks.jsx';
import RecentTasks from './components/RecentTasks.jsx';
import AddTask from './AddTask.jsx';

import urgency from './urgency.service';
import socket from './socketio.js';

// redux stuff
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { getAllCompleted } from './actions/completedActions';
import { getAllTasks } from './actions/taskActions';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers/index';

const middleware = [thunk, logger()];

let store = createStore(appReducer, applyMiddleware(...middleware));

class App extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   now: Date.now(),
    //   overdueTasks: [],
    //   recentTasks: [],
    //   urgentTasks: [],
    //   // completedTasks: []
    // };

    // setInterval(() => {
    //   this.setState({now: Date.now()});

    //   let allTasks = [].concat(this.state.urgentTasks, this.state.recentTasks, this.state.overdueTasks);
    //   this.reprioritize(allTasks);
    // }, 1000 * 60); // update every minute
  }

  // reprioritize(tasks) {
  //   var t = urgency.prioritizeTasks(tasks);

  //   this.setState({
  //     overdueTasks: t.overdue,
  //     urgentTasks: t.urgent,
  //     recentTasks: t.recent
  //   });
  // }

  componentWillMount() {
    // socket.emit('get all tasks');
    // socket.emit('get completeds');
  }

  componentDidMount() {
    // socket.on('sending all tasks', this.reprioritize.bind(this));

    // socket.on('sending completeds', completedTasks => {
    //   let formatted = completedTasks.map(item => {
    //     return {
    //       name: item.task.name,
    //       user: item.user.name,
    //       createdAt: item.createdAt,
    //       id: item.id
    //     };
    //   });
    //   console.log('get completedTasks', formatted);
    //   this.setState({completedTasks: formatted});
    // });

    // socket.on('create task', newTask => {
    //   socket.emit('get all tasks');
    // });

    socket.on('complete task', function(completedTask) {
      socket.emit('get all tasks');

      var cs = this.state.completedTasks;
      cs.unshift(completedTask);

      this.setState({
        completedTasks: cs
      });
    }.bind(this));


  }

  render() {

    return (
      <MuiThemeProvider className="container">
        <div>
          <Navbar />

          <div className="row">
            <div className="col-xs-2 col-xs-offset-5">
              <AddTask/>
            </div>
            <div className="col-xs-12">
              <OverdueTasks />

              <UrgentTasks />

              <RecentTasks />
            </div>
          </div>

          <CompletedList />
        </div>
      </MuiThemeProvider>
    );
  }
}

store.dispatch(getAllCompleted());
store.dispatch(getAllTasks());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);


// Removed Routes for the sake of building the single App page.
// TODO: reconnect the app using routers.
// Curious to see how authentication plays into the current route scheme
// For instance, we take the user to the main view on load..
// Whereas I think we should be taking them to login/signup
// And later, redirect them to App View if their log in was successful.

// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}/>
//     <Route path="login" component={Login}/>
//   </Router>),
// document.getElementById('app'));
