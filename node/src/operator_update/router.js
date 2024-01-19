const express = require('express')
const router = express.Router()
const {
  createOperatorUpdateHandler,
  updateOperatorUpdateHandler,
  destroyOperatorUpdateHandler,
  showAllOperatorUpdateHandler,
  showOneOperatorUpdateHandler
} = require('./handler')

router.post("/add", createOperatorUpdateHandler);
router.get("/showAll", showAllOperatorUpdateHandler );
router.get("/showOne", showOneOperatorUpdateHandler);
router.put('/update', updateOperatorUpdateHandler);
router.delete("/delete",destroyOperatorUpdateHandler);

module.exports = router