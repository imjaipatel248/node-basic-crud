const express = require("express");
const router = express.Router();
const {
  home,
  findBySearch,
  addUser,
  getUserForm,
  getEditUserForm,
  editUser,
  deleteUser,
  viewUser,
} = require("../controller/userController");

router.get("/", home);
router.post("/", findBySearch);
router.get("/addUser", getUserForm);
router.post("/addUser", addUser);
router.get("/editUser/:id", getEditUserForm);
router.post("/editUser/:id", editUser);
router.get("/:id", deleteUser);
router.get("/viewUser/:id", viewUser);
module.exports = router;
