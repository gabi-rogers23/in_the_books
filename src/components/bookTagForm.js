import React from "react";
import { useState, useEffect } from "react";
import { fetchAllTags } from "../api/api";
import TagSelector from "./tagSelector";

const BookTagForm = (props) => {
  const [tags, setTags] = useState([]);

  const selectedBookTags = props.book.tags.map((tag) => tag.tagId);
  tags.forEach((tag) => {
    tag.isSelected = selectedBookTags.includes(tag.id);
  });
  console.log("CurrentTags", tags);

  props.bookToSend.current.tags = tags;

  useEffect(() => {
    fetchAllTags().then(setTags).catch(console.log);
  }, []);

  // console.log(props.book);
  return (
    <div>
      <h3>Book Tags!</h3>
      <form>
        <label>Tags</label>

        {tags.map((tag) => {
          return <TagSelector tag={tag} key={tag.id} />;
        })}

        <button>New Tag</button>
      </form>
    </div>
  );
};

export default BookTagForm;
