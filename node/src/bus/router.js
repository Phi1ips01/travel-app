const express = require('express')
const router = express.Router()
const {
  createBusHandler,
  updateBusHandler,
  destroyBusHandler,
  showAllBusHandler,
  showOneBusHandler
} = require('./handler')

router.post("/addNewBus", createBusHandler);
router.get("/showAllBus", showAllBusHandler );
router.get("/showOneBus", showOneBusHandler);
router.put('/updateBus', updateBusHandler);
router.delete("/deleteBus",destroyBusHandler);

module.exports = router