import React, { useState } from "react";
import dayjs from "dayjs";
import { t } from "@lingui/macro";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DatePickerComponent from "./DatePickerComponent";
import withStyles from "@mui/styles/withStyles";

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
  task: t`Task`,
  description: t`Description`,
  dueDate: t`Due Date`,
  buttonTitle: t`Create a New Task`,
};
const CreateTask = ({ addTask }) => {
  const [open, setOpen] = useState(false);
  const [title, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [dueDate, setDate] = useState(dayjs());

  const [errors, setErrors] = useState({
    name: null,
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleTaskName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleDate = (value) => {
    dayjs(value).isValid() && setDate(value);
  };

  const createTask = () => {
    addTask({ title, dueDate, description });
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
      <Dialog
        open={open}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {LOCAL_CONSTANTS.title}
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={12}>
              <TextField
                label={LOCAL_CONSTANTS.task}
                id="fullWidth"
                value={title}
                onChange={handleTaskName}
                helperText={errors["title"]}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={LOCAL_CONSTANTS.description}
                id="description"
                name="description"
                value={description}
                onChange={handleDescription}
                fullWidth
                multiline
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePickerComponent
                label={LOCAL_CONSTANTS.dueDate}
                value={dueDate}
                minDate={dayjs()}
                onChange={handleDate}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1} direction="row" justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={handleDialog}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={createTask}>
                Proceed
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(CreateTask);
