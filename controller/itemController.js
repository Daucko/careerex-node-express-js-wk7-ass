const Item = require('../models/Item.js');

// Add a found item
const addFoundItem = async (req, res) => {
  const { itemName, description, locationFound } = req.body;
  if (!itemName || !description || !locationFound)
    return res.status(400).json({
      message: 'Name, description and location are required',
    });

  try {
    const item = await Item.create({
      itemName,
      description,
      locationFound,
    });
    res.status(201).json({
      message: 'Item added successfully',
      item,
    });
  } catch (err) {
    console.log('err');
    res.status(500).json({
      message: 'Server error',
    });
  }
};

// View all unclaimed items
const getUnclaimedItems = async (req, res) => {
  try {
    const items = await Item.find({ claimed: false });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View one item by ID
const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: `Item not found` });
  }
};

// Update an item’s details or mark as claimed
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, description, locationFound, dateFound, claimed } = req.body;
  try {
    const item = await Item.findByIdAndUpdate(
      id,
      { itemName, description, locationFound, dateFound, claimed },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete old/irrelevant entries
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item)
      return res.status(404).json({
        message: 'Item not found',
      });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addFoundItem,
  getUnclaimedItems,
  getItemById,
  updateItem,
  deleteItem,
};
