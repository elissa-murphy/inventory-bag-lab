import React from "react";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

export default function InventoryItem(props) {
  return (
    <ListItem>
      {props.item.name}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.addItem(props.item.id);
        }}
      >
        Add
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          props.showInfo(props.item.id);
        }}
      >
        Info
      </Button>
    </ListItem>
  );
}
