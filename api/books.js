const express = require("express");
const { getAllBooks } = require ("../database");


//GET /books

router.get("/", async (req, res, next) => {
    try{
 const books = await getAllBooks()
 res.send(books)
    }catch(error){
        next(error)
    }
});