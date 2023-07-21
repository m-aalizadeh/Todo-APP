import React, { useState } from "react";
import { t } from "@lingui/macro";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import withStyles from "@mui/styles/withStyles";
import CustomDialog from "../../common/components/CustomDialog";
import CreateTaskForm from "./CreateTaskForm";
import NoData from "../NoData";
import { APIHelper } from "../../services/api";
import { getFormattedDate, constants } from "../../common/utils";

const MenuItems = ({
  todo,
  handleClick,
  open,
  handleExpand,
  handleComplete,
}) => {
  return (
    <>
      <Checkbox
        checked={todo.status === constants.status.completed}
        onChange={handleComplete}
        inputProps={{ "aria-label": "controlled" }}
      />
      <IconButton size="small" onClick={() => handleClick("edit", todo)}>
        <EditIcon />
      </IconButton>
      <IconButton size="small" onClick={() => handleClick("delete", todo.id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton size="small" onClick={handleExpand}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </>
  );
};

const styles = () => ({
  highPriorityCard: {
    borderWidth: 4,
    borderLeft: `2px solid red`,
  },
  lowPriorityCard: {
    borderWidth: 4,
    borderLeft: `2px solid orange`,
  },
});

const Todos = ({ todos = [], getTodos, handleShowToast, classes }) => {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (id) => {
    const isOpen = !open ? id : null;
    setOpen(isOpen);
  };

  const handleShowDialog = (todo) => {
    setOpenDialog(todo);
  };

  const handleHideDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = async (action, todo) => {
    if (action === "delete") {
      const result = await APIHelper.deleteRequest("todo", todo);
      if (result?.status) {
        const { status = "", message = "" } = result;
        handleShowToast({
          message: message,
          type: status,
        });
      }
    } else if (action === "edit") {
      handleShowDialog(todo);
    }
    getTodos();
  };

  const handleUpdateTodo = async (payload) => {
    const result = await APIHelper.patchRequest(
      "todo/update",
      payload,
      openDialog.id
    );
    if (result?.id) {
      handleShowToast({
        message: "Task updated successfully!",
        type: "success",
      });
    }
    handleHideDialog();
    getTodos();
  };

  const handleComplete = async (id) => {
    await APIHelper.patchRequest(
      "todo/update",
      { status: constants.status.completed },
      id
    );
    handleHideDialog();
    getTodos();
  };

  if (!todos.length) {
    return <NoData />;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        sx={{
          width: "100%",
          maxWidth: 530,
          bgcolor: "background.paper",
        }}
      >
        {todos.map((todo) => {
          const {
            id = "",
            title = "",
            description = "",
            dueDate = "",
            priority = "LOW",
          } = todo;
          const date = getFormattedDate(dueDate);
          return (
            <Card
              className={
                priority === "LOW" || !priority
                  ? classes.lowPriorityCard
                  : classes.highPriorityCard
              }
              key={title}
            >
              <CardHeader
                action={
                  <MenuItems
                    open={open}
                    todo={todo}
                    handleClick={handleEdit}
                    handleExpand={() => handleClick(id)}
                    handleComplete={() => handleComplete(id)}
                  />
                }
                title={title}
                subheader={date}
              />
              <Collapse in={open === id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{description}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
      </Grid>
      <CustomDialog
        open={openDialog}
        handleCancel={handleHideDialog}
        handleProceed={handleUpdateTodo}
        title={t`Edit Task`}
        component={
          <CreateTaskForm
            initialValues={openDialog}
            handleProceed={handleUpdateTodo}
            handleCancel={handleHideDialog}
          />
        }
      />
    </Box>
  );
};

export default withStyles(styles)(Todos);
