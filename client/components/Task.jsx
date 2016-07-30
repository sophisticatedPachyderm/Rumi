import React from 'react';
import { connect } from 'react-redux';
import { completeTaskToServer, updateDueDateToServer } from '../actions/taskActions';
import { claimTaskToServer } from '../actions/claimActions';
import { TimeRemaining } from './TimeRemaining.jsx';

// Material things
import CircularProgress from 'material-ui/CircularProgress';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
//
// const style = {
//   height: 50,
//   width: 50,
//   margin: 10,
//   textAlign: 'center',
//   display: 'inline-block',
//   overflow: 'hidden'
// };

const colors = {
  recent: '#5ED848',
  urgent: '#E39E2E',
  overdue: '#F0401D',
};

class Task extends React.Component {
  constructor(props) {
    super(props);
    console.log('Task props:', props);
    this.state = {
      open: false,
    }
  }

  completeTask() {
    let taskId = this.props.id;
    this.props.dispatch(completeTaskToServer({ taskId }));
  }

  componentDidMount() {

  }

  // helpers for the model
  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  claimTask() {
    let taskId = this.props.id;
    this.props.dispatch(claimTaskToServer( {taskId} ));
  }

  addToDueDate(increase) {
    let originalDueDateMills = new Date(this.props.duebyNumber).getTime();

    let overdue = originalDueDateMills < Date.now();

    let newDate;
      // parse out whether to add a day or an hour

    if (increase === 'hour') {
      increase = 3600000;
    } else if (increase = 'day') {
      increase = 3600000 * 24;
    }
    // check whether the task is overdue
    if (overdue) {
      // if overdue
      newDate = Date.now() + increase;
    } else {
      // otherwise still valid
      let incDueDate = originalDueDateMills + increase;
      newDate = new Date(incDueDate);
    }

    let isodate = new Date(newDate).toISOString();

    let taskId = this.props.id;
    this.props.dispatch(updateDueDateToServer( {taskId, isodate} ));
  }

  render() {
    let dueMills = new Date(this.props.duebyNumber).getTime();
    let a = dueMills - Date.now();
    let percentage = a / this.props.interval;
    let displayPercentage = percentage <= 0 ? 1 : 1 - percentage;

    let color = colors[this.props.status];
    let lastCompletedBy;
    if (this.props.lastCompletedBy) {
      lastCompletedBy = 'Last Completed By: ' + this.props.lastCompletedBy;
    } else {
      lastCompletedBy = 'Not Completed Yet'
    }
    return (
      <div>
        <div className="outerTaskBox" onTouchTap={this.handleTouchTap.bind(this)}>
          <CircularProgress
            className="circle"
            color={color}
            mode={'determinate'}
            value={displayPercentage * 100}
            size={2} />

          <div className="innerTaskText">
            <span className="task_name">{this.props.name}</span>
            <TimeRemaining preciseDueBy={this.props.preciseDueBy}/>
            <span className="task_lcb">{lastCompletedBy}</span> <br />
            <span className="task_lcb">claimed by: {this.props.claimedBy || 'no one yet'}</span>
          </div>
        </div>
        <div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}>
          <Menu>
            <MenuItem
              primaryText="Claim for later"
              onClick={this.claimTask.bind(this)} />
            <MenuItem
              primaryText="Complete"
              onClick={this.completeTask.bind(this)} />
            <MenuItem
              primaryText="extend by an hour"
              onClick={this.addToDueDate.bind(this, 'hour')} />
            <MenuItem
              primaryText="extend by a day"
              onClick={this.addToDueDate.bind(this, 'day')} />
          </Menu>
        </Popover>
      </div>
      </div>
    );
  }
}

Task = connect()(Task);
// onTouchTap={this.completeTask.bind(this)}
/*
<div className="outerTaskBox">
    <canvas ref="canvas" width={108} height={108} />

</div>
*/
export default Task;
