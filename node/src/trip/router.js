const express = require('express')
const router = express.Router()
const {
  createTripHandler,
  updateTripHandler,
  destroyTripHandler,
  showAllTripHandler,
  showOneTripHandler
} = require('./handler')

router.post("/add", createTripHandler);
router.get("/showAll", showAllTripHandler );
router.get("/showOne", showOneTripHandler);
router.put('/update', updateTripHandler);
router.delete("/delete",destroyTripHandler);

module.exports = router