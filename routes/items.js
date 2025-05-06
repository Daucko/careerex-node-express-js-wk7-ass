const express = require('express');
const router = express.Router();
const itemController = require('../controller/itemController');

// POST /api/items - Add a found item
router.post('/', itemController.addFoundItem);

// GET /api/items/unclaimed - View all unclaimed items
router.get('/unclaimed', itemController.getUnclaimedItems);

router
  .route('/:id')
  .get(itemController.getItemById) // GET /api/items/:id - View one item by ID
  .put(itemController.updateItem) // PUT /api/items/:id - Update an item
  .delete(itemController.deleteItem); // DELETE /api/items/:id - Delete an item

module.exports = router;
