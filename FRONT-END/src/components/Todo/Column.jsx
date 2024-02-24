import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Droppable } from "react-beautiful-dnd";
import { t } from "@lingui/macro";
import Visible from "../../common/components/Visible";
import CustomDialog from "../../common/components/CustomDialog";
import CreateColumnForm from "./CreateColumnForm";
import CreateTaskForm from "./CreateTaskForm";
import Task from "./Task";
import { commonFetch } from "../../services/api";

const LOCAL_CONSTANTS = {
  title: t`Update Column Details`,
};

const Column = ({
  title,
  columnId,
  description,
  tasks,
  getColumns,
  handleShowToast,
}) => {
  const [modal, setModal] = useState(null);

  const handleModal = (modalType) => {
    setModal(modalType);
  };

  const handleCancel = () => {
    handleModal(null);
  };

  const onUpdate = async ({ title = "", description }) => {
    const updatedColumn = await commonFetch(
      "PATCH",
      `column/update/${columnId}`,
      undefined,
      {
        title,
        description,
      }
    );
    if (updatedColumn.id) {
      await getColumns();
    }
  };

  const handleDelete = async () => {
    const result = await commonFetch("DELETE", `column/delete/${columnId}`);
    if (result.status === "success") {
      await getColumns();
    }
  };

  const createTask = async (payload) => {
    const result = await commonFetch("POST", `todo/${columnId}`, undefined, {
      ...payload,
      columnId,
    });
    if (result?.id) {
      handleShowToast({
        type: "success",
        message: "Task created Successfully!",
      });
    } else {
      handleShowToast({
        type: "failed",
        message: "Task creation Failed!",
      });
    }
    getColumns();
    handleCancel();
  };

  return (
    <Grid
      container
      py={2}
      direction="column"
      style={{
        borderRadius: 6,
        backgroundColor: "grey",
        color: "white",
      }}
    >
      <Grid item pl={1}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <IconButton size="small" onClick={handleModal}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <Grid
            container
            direction="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Visible when={tasks.length}>
              {tasks.map((task, index) => {
                return (
                  <Grid
                    item
                    mx={1}
                    mt={1}
                    key={task.id}
                    style={{
                      borderRadius: 3,
                      border: "1px solid #EAEAEA",
                      color: "white",
                      minHeight: "17vh",
                      maxHeight: "22vh",
                    }}
                  >
                    <Task task={task} index={index} onRefresh={getColumns} />
                  </Grid>
                );
              })}
              {provided.placeholder}
            </Visible>
          </Grid>
        )}
      </Droppable>
      <Grid item align="center" mt={2}>
        <Button variant="contained" onClick={() => handleModal("task")}>
          <Typography variant="caption">Add New Task</Typography>
        </Button>
      </Grid>
      <CustomDialog
        header={LOCAL_CONSTANTS.title}
        open={modal !== null}
        component={
          <Visible
            when={modal === "column"}
            otherwise={
              <CreateTaskForm
                handleProceed={createTask}
                handleCancel={handleCancel}
              />
            }
          >
            <CreateColumnForm
              onUpdate={onUpdate}
              handleClose={handleCancel}
              title={title}
              description={description}
            />
          </Visible>
        }
        handleCancel={handleCancel}
      />
    </Grid>
  );
};

Column.propTypes = {
  title: PropTypes.string,
  columnId: PropTypes.string,
  description: PropTypes.string,
  tasks: PropTypes.array,
  getColumns: PropTypes.func,
  handleShowToast: PropTypes.func,
};

Column.defaultProps = {
  title: "",
  columnId: "",
  description: "",
  tasks: [],
  getColumns: () => {},
  handleShowToast: () => {},
};
export default Column;
