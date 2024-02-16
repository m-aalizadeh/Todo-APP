import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { constants } from "../../common/utils";

const MenuItems = ({
  todo,
  handleClick,
  open,
  handleExpand,
  handleComplete,
}) => {
  return (
    <>
      <Checkbox
        checked={todo.status === constants.status.completed}
        onChange={handleComplete}
        inputProps={{ "aria-label": "controlled" }}
      />
      <IconButton size="small" onClick={() => handleClick("edit", todo)}>
        <EditIcon />
      </IconButton>
      <IconButton size="small" onClick={() => handleClick("delete", todo.id)}>
        <DeleteIcon />
      </IconButton>
      <IconButton size="small" onClick={handleExpand}>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </>
  );
};

export default MenuItems;
