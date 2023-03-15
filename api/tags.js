const express = require("express");
const router = express.Router();
const { getTagById, getAllTags, createBookTag, deleteAllBookTags, getBookById } = require("../database");
const { requireUser } = require("./utils");

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

router.post("/:bookId", requireUser, async (req, res, next) => {
  // console.log(req.params.bookId)
  if(req.user.isAdmin){
  try{
    await addBookTag(req.params.bookId, req.body.tags)
    const book = await getBookById(req.params.bookId)
    res.send(book)
  }catch(error){
    next(error)
  }
}else{
  res.status(403).send({
    error: "403 Forbidden",
    message: `${req.user.email} is not an Admin!`,
    name: "Admin Error"
  })
}
})

router.delete("/:bookId", requireUser, async(req, res, next)=>{
  if(req.user.isAdmin){
    try{
      const deleteAll = await deleteAllBookTags(req.params.bookId);
      res.send("Tags Deleted.")
    }catch(error){
      next(error)
    }
  }else{
    res.status(403).send({
      error: "403 Forbidden",
      message: `${req.user.email} is not an Admin!`,
      name: "Admin Error"
  })
}
})
  
  module.exports = router;