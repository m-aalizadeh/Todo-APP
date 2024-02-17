import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Draggable } from "react-beautiful-dnd";
import CustomDialog from "../../common/components/CustomDialog";
import CreateTaskForm from "./CreateTaskForm";
import { commonFetch } from "../../services/api";

const LOCAL_CONSTANTS = {
  title: "Edit Task Details",
  colors: {
    high: "red",
    low: "yellow",
  },
};
const Task = ({ task, index, onRefresh }) => {
  const [modal, setModal] = useState(null);
  const { id = "", title = "", priority = "", column = {} } = task;

  const handleDelete = async () => {
    const result = await commonFetch("DELETE", `todo/delete/${id}`);
    if (result.status === "success") {
      await onRefresh();
    }
  };

  const handleModal = (modalType) => {
    setModal(modalType);
  };

  const handleCancel = () => {
    handleModal(null);
  };

  const onUpdate = async (updatedObj = {}) => {
    const updatedTask = await commonFetch(
      "PATCH",
      `todo/update/${id}`,
      undefined,
      { ...updatedObj, columnId: column.id }
    );
    if (updatedTask?.id) {
      await onRefresh();
    }
    handleCancel();
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Grid
            container
            direction="column"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            pl={1}
          >
            <Grid item pt={1}>
              <Grid container direction="row">
                <Grid item xs={3} align="center">
                  <Typography
                    style={{
                      backgroundColor:
                        LOCAL_CONSTANTS.colors[priority.toLowerCase()],
                      color: "black",
                      borderRadius: 3,
                    }}
                  >
                    {priority}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container justifyContent="flex-end">
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
            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
          </Grid>
        )}
      </Draggable>
      <CustomDialog
        header={LOCAL_CONSTANTS.title}
        open={modal !== null}
        component={
          <CreateTaskForm
            handleProceed={onUpdate}
            handleCancel={handleCancel}
            initialValues={task}
          />
        }
        handleCancel={handleCancel}
      />
    </>
  );
};

Task.propTypes = {
  index: PropTypes.string,
  task: PropTypes.object,
  onRefresh: PropTypes.func,
};

Task.defaultProps = {
  index: "",
  task: {},
  onRefresh: () => {},
};
export default Task;
