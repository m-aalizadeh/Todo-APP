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
import withStyles from "@mui/styles/withStyles";
import CustomDialog from "../common/components/CustomDialog";
import CreateTaskForm from "./CreateTaskForm";
import NoData from "./NoData";
import { APIHelper } from "../services/api";
import { getFormattedDate } from "../common/utils";

const MenuItems = ({ todo, handleClick, open, handleExpand }) => {
  return (
    <>
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

const Todos = ({ todos = [], getTodos, classes }) => {
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
      await APIHelper.deleteRequest("todo", todo);
    } else if (action === "edit") {
      handleShowDialog(todo);
    }
    getTodos();
  };

  const handleUpdateTodo = async (payload) => {
    await APIHelper.patchRequest("todo", payload, open.id);
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
                    todo={todo}
                    handleClick={handleEdit}
                    handleExpand={() => handleClick(id)}
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
