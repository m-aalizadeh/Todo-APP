import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Toast = ({ handleHideToast, toastProperty = {} }) => {
  const { isVisible = false, message = "", type = "" } = toastProperty;

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleHideToast({ type, message })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isVisible}
        action={action}
        message={message}
        variant={type}
      />
    </Box>
  );
};

export default Toast;
