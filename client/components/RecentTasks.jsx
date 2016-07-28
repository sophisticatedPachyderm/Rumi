import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';

let RecentTasks = ({recentTasks}) => (
  <ul>
    {recentTasks.map(recentTask => {
      return (
        <div className="col-xs-3" key={recentTask.id}>
          <Task
            id={recentTask.id}
            name={recentTask.name}
            due={moment().endOf(recentTask.dueBy).from(this.state.now)}
            overdue={2}
            />
        </div>
      );
    })}
  </ul>
);

RecentTasks.propTypes = {
  recentTasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = function(state) {
  return {
    recentTasks: state.tasks.recentTasks
  };
};

RecentTasks = connect(
  mapStateToProps
)(RecentTasks);

export default RecentTasks;