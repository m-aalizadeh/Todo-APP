import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import NoData from "./NoData";
import { getFormattedDate } from "../common/utils";

const Todos = ({ todos = [] }) => {
  const [open, setOpen] = useState(null);

  const handleClick = (id) => {
    const isOpen = !open ? id : null;
    setOpen(isOpen);
  };

  return !todos.length ? (
    <NoData />
  ) : (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <List
        sx={{
          width: "100%",
          maxWidth: 530,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        {todos.map(
          ({
            id = "",
            title = "",
            description = "",
            dueDate = "",
            priority = "high",
          }) => {
            const date = getFormattedDate(dueDate);
            return (
              <ListItem key={title}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <ListItemButton onClick={() => handleClick(id)}>
                      <ListItemAvatar>
                        <Avatar>
                          <Tooltip title={priority}>
                            <PriorityHighIcon
                              color={
                                priority === "Low" ? "secondary" : "primary"
                              }
                            />
                          </Tooltip>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={title} secondary={date} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  </Grid>
                  <Grid item xs={12}>
                    <Collapse in={open === id} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <Typography>{description}</Typography>
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </Grid>
                </Grid>
              </ListItem>
            );
          }
        )}
      </List>
    </Box>
  );
};

export default Todos;
