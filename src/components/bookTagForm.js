import React from "react";
import { useState, useEffect } from "react";
import { fetchAllTags } from "../api/api";

const BookTagForm = () => {
    const [tagList, setTagList] = useState([])
    const [tag, setTag] = useState("")
    const [bookTags, setBookTags] = useState([])

    useEffect(() => {
        fetchAllTags().then(
          (allTagsResults) => {
            try {
              console.log(allTagsResults)
              setTagList(allTagsResults)
            } catch (err) {
              console.error("Uh oh! Problems with Promises");
            }
          }
        );
      }, []);


  return (
    <div>
        <h3>Book Tags!</h3>
        {/* Need a drop down menu with existing tags + option for new tags.  Only show form if newTag is selected  */}
        <fieldset>
        <label>
          Tags
        </label>
        <span>{bookTags}</span>
        <select
          value={tag}
          onChange={(e) => { 
            e.preventDefault();
            setTag(e.target.value)
           }}
        >
          {tagList.map((tag) => {
            return (<option value={tag.name} key={tag.id}>{tag.name}</option>)
          })}
        </select>
        <button
        onClick={(e)=>{
            e.preventDefault();
            
        }}>Add</button>
      </fieldset>
    </div>
  );
};

export default BookTagForm;
