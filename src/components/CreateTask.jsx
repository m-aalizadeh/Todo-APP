import React, { useState } from "react";
import dayjs from "dayjs";
import { t } from "@lingui/macro";
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

const LOCAL_CONSTANTS = {
  title: t`Create a New Task`,
  task: t`Task`,
  description: t`Description`,
  dueDate: t`Due Date`,
  buttonTitle: t`Create Task`,
};
const CreateTask = ({}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(dayjs());

  const [errors, setErrors] = useState({
    name: null,
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  const createTask = () => {
    handleDialog();
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

  console.log(name, description, date);

  return (
    <>
      <Box
        sx={{
          border: 1,
          borderRadius: 2,
          borderColor: "primary.main",
          p: 2,
        }}
      >
        <Grid container spacing={4} direction="row">
          <Grid item xs={4}>
            <Fab color="primary" aria-label="add" onClick={handleDialog}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={8} mt={2}>
            <Typography color="blue">{LOCAL_CONSTANTS.buttonTitle}</Typography>
          </Grid>
        </Grid>
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
                value={name}
                onChange={handleTaskName}
                helperText={errors["name"]}
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
                value={date}
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

export default CreateTask;
