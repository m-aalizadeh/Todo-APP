import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Toast = ({ handleHideToast, toastProperty }) => {
  const { isVisible = false, message = "", type = "" } = toastProperty;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isVisible}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => handleHideToast({ type, message })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        message={message}
        variant={type}
      />
    </Box>
  );
};

Toast.propTypes = {
  toastProperty: PropTypes.object,
  handleHideToast: PropTypes.func,
};

Toast.defaultProps = {
  toastProperty: {},
  handleHideToast: () => {},
};

export default Toast;
