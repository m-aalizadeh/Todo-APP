import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  const { id = "", title } = task;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListItem
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {title}
        </ListItem>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  index: PropTypes.string,
  task: PropTypes.object,
};

Task.defaultProps = {
  index: "",
  task: {},
};
export default Task;
