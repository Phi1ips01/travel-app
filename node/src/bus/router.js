const express = require('express')
const router = express.Router()
const {
  createBusHandler,
  updateBusHandler,
  destroyBusHandler,
  showAllBusHandler,
  showOneBusHandler
} = require('./handler')

router.post("/add", createBusHandler);
router.get("/showAll", showAllBusHandler );
router.get("/showOne", showOneBusHandler);
router.put('/update', updateBusHandler);
router.delete("/delete",destroyBusHandler);

module.exports = router