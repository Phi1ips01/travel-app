const express = require('express')
const authenticateToken = require('../../middleware/authenticate')
const router = express.Router()
const {
  createBusOperatorHandler,
  updateBusOperatorHandler,
  destroyBusOperatorHandler,
  showAllBusOperatorHandler,
  showOneBusOperatorHandler
} = require('./handler')

router.use(authenticateToken)

router.post("/add", createBusOperatorHandler);
router.get("/showAll", showAllBusOperatorHandler );
router.get("/showOne", showOneBusOperatorHandler);
router.put('/update', updateBusOperatorHandler);
router.delete("/delete",destroyBusOperatorHandler);

module.exports = router