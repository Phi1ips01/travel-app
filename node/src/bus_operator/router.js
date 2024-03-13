const express = require('express')
const authenticateToken = require('../../middleware/authenticate')
const router = express.Router()
const {
  createBusOperatorHandler,
  updateBusOperatorHandler,
  destroyBusOperatorHandler,
  showAllBusOperatorHandler,
  showOneBusOperatorHandler,
  getTotalAmountAndProfitHandler
} = require('./handler')

router.use(authenticateToken)

router.post("/add", createBusOperatorHandler);
router.get("/showAll", showAllBusOperatorHandler );
router.get("/showOne", showOneBusOperatorHandler);
router.get("/getTotal", getTotalAmountAndProfitHandler);
router.put('/update', updateBusOperatorHandler);
router.delete("/delete",destroyBusOperatorHandler);

module.exports = router