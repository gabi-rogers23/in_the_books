const express = require("express");
const router = express.Router();
const { getTagById, getAllTags } = require("../database");


//GET all tags

router.get("/", async (req, res, next)=>{
  try{
    const tagsList = await getAllTags();
    res.send(tagsList);
  }catch(error){
    next(error);
  }
})

//GET /tags/:tagId
router.get("/:tagId", async (req, res, next) => {
    try {
      const tag = await getTagById(req.params.tagId);
      // console.log("ROUTES: ", tag)
      res.send(tag);
    } catch (error) {
      next(error);
    }
  });

  //POST book_tag
  
  module.exports = router;