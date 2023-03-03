const express = require("express");
const router = express.Router();
const { getTagById } = require("../database");

//GET /tags/:tagId
router.get("/:tagId", async (req, res, next) => {
    try {
      const tag = await getTagById(req.params.tagId);
      console.log("ROUTES: ", tag)
      res.send(tag);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;