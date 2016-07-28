import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from './Task.jsx';
import moment from 'moment';

let OverdueTasks = ({overdueTasks}) => (
  <ul>
    {overdueTasks.map(overdueTask => {
      return (
        <div className="col-xs-3" key={overdueTask.id}>
          <Task
            id={overdueTask.id}
            name={overdueTask.name}
            due={moment().endOf(overdueTask.dueBy).fromNow()}
            color={0}
            key={overdueTask.id}
          />
        </div>
      );
    })}
  </ul>
);

OverdueTasks.propTypes = {
  overdueTasks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = function(state) {
  //do something to filter just overdue tasks
  return {
    overdueTasks: state.tasks
  };
};

OverdueTasks = connect(
  mapStateToProps
)(OverdueTasks);

export default OverdueTasks;