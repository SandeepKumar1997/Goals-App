const express = require("express");
const {
  getRoute,
  postRoute,
  updateRoute,
  deleteRoute,
} = require("../controllers/testcontroller");
const authenticate = require("../middleware/auth");
const router = express.Router();

router.route("/").get(authenticate, getRoute).post(authenticate, postRoute);
router
  .route("/:id")
  .put(authenticate, updateRoute)
  .delete(authenticate, deleteRoute);

module.exports = router;
