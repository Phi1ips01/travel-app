const express = require('express')
const router = express.Router()
const {
  createUserHandler,
  updateUserHandler,
  destroyUserHandler,
  showAllUserHandler,
  showOneUserHandler
} = require('./handler')

router.post("/add", createUserHandler);
router.get("/showAll", showAllUserHandler );
router.get("/showOne", showOneUserHandler);
router.put('/update', updateUserHandler);
router.delete("/delete",destroyUserHandler);

module.exports = router