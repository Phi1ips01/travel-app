const express = require('express')
const authenticateToken = require('../../middleware/authenticate')
const router = express.Router()
const {
  createBusHandler,
  updateBusHandler,
  destroyBusHandler,
  showAllBusHandler,
  showOneBusHandler
} = require('./handler')
console.log("router")
router.use(authenticateToken)
router.post("/add", createBusHandler);
router.get("/showAll", showAllBusHandler );
router.get("/showOne", showOneBusHandler);
router.put('/update', updateBusHandler);
router.delete("/delete",destroyBusHandler);

module.exports = router