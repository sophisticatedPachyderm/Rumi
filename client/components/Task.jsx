import React from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { completeTaskToServer } from '../actions/taskActions';

let style = {
  height: 50,
  width: 50,
  margin: 10,
  textAlign: 'center',
  display: 'inline-block',
  overflow: 'hidden'
};

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  completeTask () {
    let taskId = this.props.id;
    this.props.dispatch(completeTaskToServer({taskId}));
  }

  render() {

    let style2 = Object.assign({}, style);
    if (this.props.color === 0) {
      style2.border = '2px solid red';
    } else if (this.props.color === 1) {
      style2.border = '2px solid yellow';
    } else {
      style2.border = '2px solid green';
    }

    return (
      <div>
        <Paper
          style={style2}
          zDepth={3}
          circle={true}
          onTouchTap={this.completeTask.bind(this)}
        >
          <div className="innerTaskText">
            {this.props.name}
          </div>
        </Paper>
      </div>
    );
  }
}

Task = connect()(Task);

export default Task;