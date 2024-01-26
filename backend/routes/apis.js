const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create a new Item
router.post("/", async (req, res) => {
  // console.log(req.body);
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {}
});

module.exports = router;
