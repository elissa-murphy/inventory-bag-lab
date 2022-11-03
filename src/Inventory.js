import React, { useState, useEffect } from "react";
import InventoryItem from "./InventoryItem";
import List from "@mui/material/List";
import Modal from "@mui/material/Modal";
import "./inventory.css";
import Bag from "./Bag";
import Grid from "@mui/material/Grid";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [selectedItem, selectItem] = useState([]);
  const [showModal, setModelOpen] = useState(false);
  const [bagItems, setBagItems] = useState([]);

  //On component mount.. load date
  useEffect(() => {
    fetch("data/items.json")
      .then((result) => result.json())
      .then((data) => {
        // console.log(data);
        //Store data
        setItems(data);
      });
  }, []);

  //Create our inventory list
  const itemsList = items.map((item) => (
    <InventoryItem
      key={item.id}
      item={item}
      addItem={addItem}
      showInfo={showInfo}
    />
  ));

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => {
          setModelOpen(false);
        }}
      >
        <div id="infoBox">
          <h3>{selectedItem.name}</h3>
          <p>{selectItem.desc}</p>
          <p>Weight: {selectedItem.weight}</p>
        </div>
      </Modal>
      <Grid container>
        <Grid>
          <h2>Items</h2>
          <List>{itemsList}</List>
        </Grid>
        <Grid>
          <h2>Bag</h2>
          <Bag items={bagItems} removeItem={removeItem} />
        </Grid>
      </Grid>
    </div>
  );

  function removeItem(itemInd) {
    //Create copy of bag items
    const tempBag = [...bagItems];

    //Remove from the copied array the item at index
    tempBag.splice(itemInd, 1);

    //Set that as our new array
    setBagItems(tempBag);
  }

  function showInfo(itemId) {
    //Select item to be show -> put it's info into a variable
    selectItem(items[itemId]);

    //Show the selected info
    setModelOpen(true);
  }

  function addItem(itemId) {
    setBagItems([...bagItems, items[itemId]]);
    // console.log(bagItems);
  }
}
