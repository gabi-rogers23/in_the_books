import React from "react";
import { useState, useEffect } from "react";
import { fetchAllTags, createNewBookTag } from "../api/api";
import TagSelector from "./tagSelector";

const BookTagForm = (props) => {
  const [tagList, setTagList] = useState([]);
  const [tagId, setTagId] = useState({});
  const [tagArray] = useState([]);

  useEffect(() => {
    fetchAllTags().then((allTagsResults) => {
      try {
        console.log(allTagsResults);
        const selectedBookTags = props.book.tags.map((tag)=>parseInt(tag.tagId))
        allTagsResults.forEach((tag)=>{
          tag.isSelected = selectedBookTags.includes(parseInt(tag.id))
        })
        setTagList(allTagsResults);
      } catch (error) {
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);

  console.log(props.book);
  return (
    <div>
      <h3>Book Tags!</h3>
      <form>
        <label>Tags</label>

          {tagList.map((tag) => {
            return (
              <TagSelector tag={tag}/>
            );
          })}

        <button
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default BookTagForm;
