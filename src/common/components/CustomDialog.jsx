import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Visible from "./Visible";

const CustomDialog = ({
  title,
  component,
  open,
  handleCancel,
  isActionsRequired = false,
  handleProceed,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Grid item xs={12}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      </Grid>
      <DialogContent>{component}</DialogContent>
      <DialogActions>
        <Visible when={isActionsRequired}>
          <Grid container spacing={1} direction="row" justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleProceed}>
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Visible>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
