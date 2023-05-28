import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import TodoBar from "./TodoBar";
import CreateTask from "./CreateTask";
import Todos from "./Todos";
import { APIHelper } from "../services/api";

const { getAllRequest, postRequest } = APIHelper;

const styles = (theme) => ({
  root: {
    position: "absolute",
    left: "45%",
    top: "25%",
  },
});

const TodoList = ({ classes }) => {
  const [tasks, setTodos] = useState([]);

  const getTodos = async () => {
    const result = await getAllRequest("todos");
    if (Array.isArray(result) && result.length) setTodos(result);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTask = async (task) => {
    await postRequest("todo", task);
    getTodos();
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <CreateTask addTask={addTask} />
      </Grid>
      <Grid item xs={12}>
        <Todos todos={tasks} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TodoList);
