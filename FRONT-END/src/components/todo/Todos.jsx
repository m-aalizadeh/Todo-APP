import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { t } from "@lingui/macro";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";
import CustomDialog from "../../common/components/CustomDialog";
import CreateTaskForm from "./CreateTaskForm";
import NoData from "../NoData";
import MenuItems from "./MenuItems";
import { commonFetch } from "../../services/api";
import { getFormattedDate, constants } from "../../common/utils";

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

const Todos = ({ todos = [], hasMore, getTodos, handleShowToast, classes }) => {
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
      const result = await commonFetch("DELETE", `todo/${todo}`);
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
    const result = await commonFetch(
      "PATCH",
      `todo/update/${openDialog.id}`,
      undefined,
      payload
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
    await commonFetch("PATCH", `todo/update/${id}`, undefined, {
      status: constants.status.completed,
    });
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
        <InfiniteScroll
          dataLength={todos.length}
          next={getTodos}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableGrid"
          style={{ height: 0, overflow: "none" }}
          endMessage="You have seen it all !"
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
        </InfiniteScroll>
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
