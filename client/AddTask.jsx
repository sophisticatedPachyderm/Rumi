import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import socket from './socketio';
import { connect } from 'react-redux';
import { addTaskToServer } from './actions/taskActions';

import annyang from 'annyang';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalNum: 1,
      intervalVal: 1,
      showModal: false,
      taskName: '',
      taskDueDate: '',
      taskInterval: 0
    };

    if (annyang) {
      const commands = {
        '(add) (new) task': () => {
          this.open();
        },
        'task name (of) *name': (name) => {
          this.setState({taskName: name});
        },
        'task occurs (every) :period *length': (period, length) => {
          this.setState({taskInterval: period});
          if (length === 'hour') {
            this.setState({intervalVal: 1});
          } else {
            this.setState({intervalVal: 2});
          }
        },
        'add': ()=> {
          this.handleSubmit();
        }
      }

      annyang.addCommands(commands);
      annyang.start();
    }

  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open() {
    this.setState({
      showModal: true
    });
  }

  handleTextFieldChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleSelectFieldChange(e, i, v) {
    this.setState({
      intervalVal: v
    });
  }

  calcDueDateAndInterval() {
    let hours = n => 1000*60*60*n;
    let days = n => hours(n) * 24;

    let n = this.state.intervalNum;
    // 1 = hours; 2 = days
    if (this.state.intervalVal === 1) {
      this.state.taskInterval = hours(n);
    } else if (this.state.intervalVal === 2) {
      this.state.taskInterval = days(n);
    }

    this.state.taskDueDate = new Date(Date.now() + this.state.taskInterval);
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    this.calcDueDateAndInterval();

    let taskName = this.state.taskName;
    let dueBy = this.state.taskDueDate;
    let interval = this.state.taskInterval;

    if (!taskName || !dueBy) {
      this.close();
      return;
    }

    this.props.dispatch(addTaskToServer({taskName, dueBy, interval}));

    this.setState({
      taskName: '',
      taskDueDate: ''
    });
    this.close();
  }

  render() {
    return(
      <div onClick={this.open.bind(this)}>
        <Button className="add_task_button">
          <img src="add.png" alt="plus"></img>
        </Button>
        <Modal bsSize="small" show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField name="taskName" hintText={this.state.taskName || 'task name...'} onChange={this.handleTextFieldChange.bind(this)}/>
          <TextField type="number" name="intervalNum" defaultValue="1" onChange={this.handleTextFieldChange.bind(this)}  floatingLabelText="Recurs every:" floatingLabelFixed={true} />
          <SelectField value={this.state.intervalVal} onChange={this.handleSelectFieldChange.bind(this)}>
            <MenuItem value={1} primaryText="hour(s)" />
            <MenuItem value={2} primaryText="day(s)" />
          </SelectField>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmit.bind(this)}>Add Task</Button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
AddTask = connect()(AddTask);

export default AddTask;
