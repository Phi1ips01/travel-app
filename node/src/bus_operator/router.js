const express = require('express')
const router = express.Router()
const {
  createBusOperatorHandler,
  updateBusOperatorHandler,
  destroyBusOperatorHandler,
  showAllBusOperatorHandler,
  showOneBusOperatorHandler
} = require('./handler')

router.post("/add", createBusOperatorHandler);
router.get("/showAll", showAllBusOperatorHandler );
router.get("/showOne", showOneBusOperatorHandler);
router.put('/update', updateBusOperatorHandler);
router.delete("/delete",destroyBusOperatorHandler);

module.exports = router