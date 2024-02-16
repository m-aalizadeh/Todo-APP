import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _cloneDeep from "lodash/cloneDeep";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DragDropContext } from "react-beautiful-dnd";
import { t } from "@lingui/macro";
import CustomDialog from "../../common/components/CustomDialog";
import CreateColumnForm from "./CreateColumnForm";
import Column from "./Column";
import { commonFetch } from "../../services/api";
import { getUserDetails } from "../../common/utils";

const LOCAL_CONSTANTS = {
  title: t`Capture Column Details`,
};

const Board = ({ handleShowToast }) => {
  const { userId = "" } = getUserDetails();

  const [allColumns, setAllColumns] = useState([]);
  const [modal, setModal] = useState(false);

  const getColumns = async () => {
    const columns = await commonFetch("GET", `column/${userId}`);
    const columnsWithTasks = [];
    if (Array.isArray(columns.content) && columns.content.length) {
      for (const { id = "", title = "", description = "" } of columns.content) {
        let tasks = await commonFetch("GET", `todos/${id}`);
        tasks =
          Array.isArray(tasks.content) && tasks.content.length
            ? tasks.content
            : [];
        columnsWithTasks.push({
          id,
          title,
          description,
          tasks,
        });
      }
    }
    setAllColumns(columnsWithTasks);
  };

  useEffect(() => {
    getColumns();
  }, []);

  const onDragStart = (tmp) => {};

  const onDragUpdate = (tmp) => {
    if (document.activeElement.tagName.toUpperCase() === "TEXTAREA") {
      document.activeElement.blur();
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const clonedColumns = _cloneDeep(allColumns);
    const start = allColumns.find((column) => column.id === source.droppableId);
    const finish = allColumns.find(
      (column) => column.id === destination.droppableId
    );

    if (start.id === finish.id) {
      const newTasks = start.tasks;
      const draggableTask = newTasks.find((task) => task.id === draggableId);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableTask);
      const updatedColumnIndex = clonedColumns.findIndex(
        (col) => col.id === start.id
      );
      clonedColumns[updatedColumnIndex] = {
        ...start,
        tasks: newTasks,
      };
      setAllColumns(clonedColumns);
      return;
    }

    // Moving from one list to another
    const startTasks = start.tasks;
    const draggableTask = startTasks.find((task) => task.id === draggableId);
    startTasks.splice(source.index, 1);
    const finishTasks = finish.tasks;
    finishTasks.splice(destination.index, 0, draggableTask);
    const startIndex = clonedColumns.findIndex((col) => col.id === start.id);
    const finishIndex = clonedColumns.findIndex((col) => col.id === finish.id);
    clonedColumns[startIndex] = {
      id: start.id,
      title: start.title,
      description: start.description,
      tasks: startTasks,
    };
    clonedColumns[finishIndex] = {
      id: finish.id,
      title: finish.title,
      description: finish.description,
      tasks: finishTasks,
    };
    const response = await commonFetch(
      "PATCH",
      `todo/update/${draggableId}`,
      undefined,
      { columnId: finish.id }
    );
    if (response?.id) {
      setAllColumns(clonedColumns);
      handleShowToast({
        type: "success",
        message: "Task updated Successfully!",
      });
    } else {
      handleShowToast({
        type: "failed",
        message: "Task modification Failed!",
      });
    }
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const onUpdate = async ({ title = "", description }) => {
    const newColumn = await commonFetch("POST", `column/${userId}`, undefined, {
      title,
      description,
    });
    if (newColumn.id) {
      await getColumns();
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Grid container direction="row">
            {allColumns.map(
              ({ id = "", title = "", description = "", tasks = [] }) => {
                return (
                  <Grid item key={id} pl={2} style={{ width: "300px" }}>
                    <Column
                      columnId={id}
                      title={title}
                      description={description}
                      tasks={tasks}
                      getColumns={getColumns}
                      handleShowToast={handleShowToast}
                    />
                  </Grid>
                );
              }
            )}
          </Grid>
        </DragDropContext>
      </Grid>
      <Grid item style={{ width: "300px" }}>
        <Button fullWidth variant="contained" onClick={handleModal}>
          <Typography variant="caption">Add New Column</Typography>
        </Button>
      </Grid>
      <CustomDialog
        header={LOCAL_CONSTANTS.title}
        open={modal}
        component={
          <CreateColumnForm onUpdate={onUpdate} handleClose={handleModal} />
        }
        handleCancel={handleModal}
      />
    </Grid>
  );
};

Board.propTypes = {
  handleShowToast: PropTypes.func,
};

Board.defaultProps = {
  handleShowToast: () => {},
};

export default Board;
