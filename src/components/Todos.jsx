import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import NoData from "./NoData";

const Todos = ({ todos = [] }) => {
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
        {todos.map(({ title = "", description = "" }) => {
          return (
            <ListItem key={title}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={title} secondary={description} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Todos;
