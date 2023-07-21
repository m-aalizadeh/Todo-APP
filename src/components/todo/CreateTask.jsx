import React, { useState } from "react";
import { t } from "@lingui/macro";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import withStyles from "@mui/styles/withStyles";
import CustomDialog from "../../common/components/CustomDialog";
import CreateTaskForm from "./CreateTaskForm";
import { APIHelper } from "../../services/api";

const { postRequest } = APIHelper;

const styles = (theme) => ({
  root: {
    border: 1,
    borderRadius: 2,
    borderColor: "grey",
    p: 2,
  },
});

const LOCAL_CONSTANTS = {
  title: t`Capture Task Details`,
  buttonTitle: t`Create a New Task`,
};
const CreateTask = ({ handleShowToast, getTodos }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { userId = "" } = user;
  const [open, setOpen] = useState(false);
  const handleDialog = () => {
    setOpen(!open);
  };

  const createTask = async (payload) => {
    const result = await postRequest("todo", { ...payload, userId });
    if (result?.id) {
      handleShowToast({
        type: "success",
        message: "Task Updated Successfully!",
      });
    }
    getTodos();
    handleDialog();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        <Paper
          elevation={2}
          sx={{
            mx: "auto",
            p: 2,
            borderRadius: 2,
            maxWidth: 500,
          }}
        >
          <Grid container spacing={4} direction="row" wrap="nowrap">
            <Grid item>
              <Fab color="primary" aria-label="add" onClick={handleDialog}>
                <AddIcon fontSize="small" />
              </Fab>
            </Grid>
            <Grid item mt={2}>
              <Typography color="blue">
                {LOCAL_CONSTANTS.buttonTitle}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <CustomDialog
        open={open}
        handleCancel={handleDialog}
        handleProceed={createTask}
        title={LOCAL_CONSTANTS.title}
        component={
          <CreateTaskForm
            handleProceed={createTask}
            handleCancel={handleDialog}
          />
        }
      />
    </>
  );
};

export default withStyles(styles)(CreateTask);
