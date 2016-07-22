import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      taskName: '',
      taskDueDate: ''
    };
  }

  close() {
    this.setState({
      showModal: false
    });
  }

  open(e) {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  }

  handleTaskNameChange(e) {
    console.log(this.state.taskName);
    this.setState({
      taskName: e.target.value
    });
  }

  handleTaskDueDateChange(e) {
    this.setState({
      taskDueDate: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let taskName = this.state.taskName;
    let dueDate =  this.state.taskDueDate;

    console.log(taskName);
    console.log(dueDate);

    if (!taskName || !dueDate) {
      this.close();
      return;
    }

    socket.emit('create task', {
      name: taskName,
      dueBy: dueDate,
      interval: 3241234 // currently hardcoded, will need to be accounted for in future
    });

    //this.props.onAddNewTask(taskName, dueDate);
    this.setState({
      taskName: '',
      taskDueDate: ''
    });
    this.close();
  }

  render() {
    return(
      <div onClick={this.open.bind(this)}>
        <img className="addTask" src="http://bit.ly/29UZrXq"/>
        <Modal bsSize="small" show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="newTask" placeholder="Enter a new task!" onChange={this.handleTaskNameChange.bind(this)}/>
          <input type="date" name="dueDate" onChange={this.handleTaskDueDateChange.bind(this)}/>
        </Modal.Body>
        <Modal.Footer>
          {/*<Button onClick={this.close.bind(this)}>Cancel</Button>*/}
          <Button onClick={this.handleSubmit.bind(this)}>Add Task</Button>
        </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddTask;
/*  code to add to App.jsx

import AddTask from './AddTask.jsx'

*** component to add to App.jsx ***
<div>
  <AddTask onAddNewTask={this.handleAddNewTask.bind(this)}/>
</div>

*** handler to add to App.jsx ***
handleAddNewTask(taskName, dueDate) {
  // this function will handle
  // posting new task to db &
  // add to pending tasks
  // how to implement???
  console.log('taskName:', taskName);
  console.log('dueDate:', dueDate);
}

*/

// code idea...
// <Button bsStyle="primary" type="submit" onClick={this.postOrSaveFunction}>Add</Button>
