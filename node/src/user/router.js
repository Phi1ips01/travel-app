const express = require('express')
const authenticateToken = require('../../middleware/authenticate')

const router = express.Router()
const {
  createUserHandler,
  updateUserHandler,
  destroyUserHandler,
  showAllUserHandler,
  showOneByPkUserHandler,
  loginUserHandler
} = require('./handler')
router.post("/login",loginUserHandler)
router.use(authenticateToken)

router.post("/add", createUserHandler);
router.get("/showAll", showAllUserHandler );
router.get("/showOne", showOneByPkUserHandler);
router.put('/update', updateUserHandler);
router.delete("/delete",destroyUserHandler);

module.exports = router