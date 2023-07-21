import React, { useState, useEffect } from "react";
import _isEmpty from "lodash/isEmpty";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import TodoBar from "./TodoBar";
import CreateTask from "./CreateTask";
import Todos from "./Todos";
import { APIHelper } from "../../services/api";

const { getAllRequest, postRequest } = APIHelper;

const styles = (theme) => ({
  root: {
    position: "absolute",
    left: "45%",
    top: "25%",
  },
});

const TodoList = ({ handleShowToast }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { userId = "" } = user;
  const [tasks, setTodos] = useState([]);

  const getTodos = async () => {
    const result = await getAllRequest(`todos/${userId}`, "offset=0&limit=20");
    if (!_isEmpty(result) && result.content) setTodos(result.content);
  };

  useEffect(() => {
    getTodos();
  }, []);

  // const addTask = async (task) => {
  //   const result = await postRequest("todo", { ...task, userId });
  //   if (result?.id) {
  //     handleShowToast({
  //       type: "success",
  //       message: "Task Created Successfully!",
  //     });
  //   }
  //   getTodos();
  // };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <CreateTask
          getTodos={getTodos}
          // addTask={addTask}
          handleShowToast={handleShowToast}
        />
      </Grid>
      <Grid item xs={12}>
        <Todos
          todos={tasks}
          getTodos={getTodos}
          handleShowToast={handleShowToast}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TodoList);
