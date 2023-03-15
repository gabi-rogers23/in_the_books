import React from "react";
import { useState, useEffect, useRef } from "react";
import { fetchAllTags, updateBookTag } from "../api/api";
import TagSelector from "./tagSelector";

const BookTagForm = (props) => {
  const [tagList, setTagList] = useState([]);
  let tags = useRef([])

  const setupTagList = () => {
    const selectedBookTags = props.book.tags.map((tag) => tag.tagId);
    let newTags = tags.current.map((tag) => {
      tag.isSelected = selectedBookTags.includes(tag.id);
      return tag
    });
    setTagList(newTags)
    console.log("CurrentTags", tags.current)
}

  useEffect(() => {
    // console.log("BOOK TAGS UPDATED")
    setupTagList()
  }, [props.book.tags])

  useEffect(() => {
    fetchAllTags().then((newTagList) => {
      tags.current = newTagList
      // console.log("CURRENT TAGS UPDATED")
      setupTagList()
    }).catch(console.log)
  }, []);

  // console.log(props.book);
  return (
    <div>
      <h3>Book Tags!</h3>
      <form>
        <label>Tags</label>

        {tagList.map((tag) => {
          return <TagSelector tag={tag} key={tag.id}/>;
        })}

        <button
          onClick={async (e) => {
            e.preventDefault();
            await updateBookTag()
          }}
        >
          Update Tags
        </button><button>New Tag</button>
      </form>
    </div>
  );
};

export default BookTagForm;
