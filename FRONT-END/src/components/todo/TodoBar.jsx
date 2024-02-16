import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { getUserDetails } from "../../common/utils";
import { commonFetch } from "../../services/api";

const TodoBar = () => {
  const { userId = "" } = getUserDetails();
  const [anchorEl, setAnchorEl] = useState(null);
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pickFile = () => {
    if (fileRef?.current) fileRef.current.value = "";
    fileRef.current.click();
  };

  const fetchPhoto = async () => {
    const result = await commonFetch("GET", `file/view/${userId}`);
    if (result?.content?.data) {
      setPhoto(result);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file, file.name);
    let url;
    let method;
    if (photo) {
      url = `updateFile/${photo.id}`;
      method = "PATCH";
    } else {
      url = `upload/${userId}`;
      method = "POST";
    }
    const result =
      (await commonFetch(method, `file/${url}`, undefined, formData)) || {};
    const { fileId = "", message = "" } = result;
    if (fileId && message) {
      await fetchPhoto();
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, []);

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <IconButton
                size="large"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar
                  src={`data:image/jpeg;base64,${photo?.content?.data}`}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Tooltip title="Click here to upload Photo">
              <IconButton size="small" color="inherit" onClick={pickFile}>
                <Avatar
                  src={`data:image/jpeg;base64,${photo?.content?.data}`}
                />
              </IconButton>
            </Tooltip>
            Maryam Aalizadeh
          </MenuItem>
        </Menu>
      </AppBar>
      <input
        hidden
        type="file"
        ref={fileRef}
        multiple={true}
        accept={[
          "image/*",
          ".jpg",
          ".jpeg",
          ".png",
          ".xls",
          ".xlsx",
          ".doc",
          ".docx",
          ".pdf",
          ".txt",
          ".msg",
        ]}
        onChange={handleFileUpload}
      />
    </>
  );
};

export default TodoBar;
