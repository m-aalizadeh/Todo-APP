import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TodoBar from "./TodoBar";
import Board from "./Board";

const Todo = ({ handleShowToast }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <Board handleShowToast={handleShowToast} />
      </Grid>
    </Grid>
  );
};

Todo.propTypes = {
  handleShowToast: PropTypes.func,
};

Todo.defaultProps = {
  handleShowToast: () => {},
};

export default Todo;
