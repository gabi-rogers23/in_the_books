import React from "react";
import { useState, useEffect } from "react";
import { fetchAllTags, updateBookTag } from "../api/api";
import TagSelector from "./tagSelector";

const BookTagForm = (props) => {
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    setTagList([])
    fetchAllTags().then((allTagsResults) => {
      try {
        console.log(allTagsResults);

        if (props.book.tags.length){
          console.log("from if")
          const selectedBookTags = props.book.tags.map((tag) => tag.tagId);
          allTagsResults.forEach((tag) => {
            tag.isSelected = selectedBookTags.includes(tag.id);
          });
          setTagList(allTagsResults);
        }else{
          console.log("from else")
          setTagList(allTagsResults)
        }
      } catch (error) {
        console.error("Uh oh! Problems with Promises", error);
      }
    });
  }, [props.book.tags]);

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
