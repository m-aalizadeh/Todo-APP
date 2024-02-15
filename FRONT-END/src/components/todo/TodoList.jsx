import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import Grid from "@mui/material/Grid";
import TodoBar from "./TodoBar";
import Board from "../todo/Board";
import { getUserDetails } from "../../common/utils";
import { commonFetch } from "../../services/api";

const TodoList = ({ handleShowToast }) => {
  const { userId = "" } = getUserDetails();
  const [todos, setTodos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pagination, setPagination] = useState({});

  const getTodos = async () => {
    const { limit, offset } = pagination;
    const newOffset = offset ? offset + 1 : 0;
    const newLimit = limit ? limit + 5 : 5;
    setPagination({
      offset: newOffset,
      limit: newLimit,
    });
    const result = await commonFetch(
      "GET",
      `todos/${userId}`,
      `offset=${newOffset}&limit=${newLimit}`
    );
    if (!_isEmpty(result) && result?.content?.length) {
      const needLoading =
        (newOffset + 1) * newLimit === result.totalElements ||
        (newOffset + 1) * newLimit > result.totalElements;

      setHasMore(!needLoading);
      setTodos(result.content);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <Board
          hasMore={hasMore}
          todos={todos}
          getTodos={getTodos}
          handleShowToast={handleShowToast}
        />
      </Grid>
    </Grid>
  );
};

TodoList.propTypes = {
  handleShowToast: PropTypes.func,
};

TodoList.defaultProps = {
  handleShowToast: () => {},
};

export default TodoList;
