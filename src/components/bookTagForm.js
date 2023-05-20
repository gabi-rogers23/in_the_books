import React from "react";
import { useState } from "react";
import { createNewTag } from "../api/api";
import { TagSelector } from "./exports";
import { useSnackbar } from "notistack";

const BookTagForm = (props) => {
  const [click, setClick] = useState(false);
  const [newTag, setNewTag] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const selectedBookTags = props.bookTags.map((tag) => tag.tagId);

  props.allTags.forEach((tag) => {
    tag.isSelected = selectedBookTags.includes(tag.id);
  });

  return (
    <div className="tagContainer">
      <h3>Add/Remove Tags:</h3>
      <div className="tagForm">
        {props.allTags.map((tag) => {
          return <TagSelector tag={tag} key={tag.id} />;
        })}
              {click ? (
        <div>
          <form>
            <input
              required
              value={newTag}
              onChange={(e) => {
                e.preventDefault();
                setNewTag(e.target.value);
              }}
            ></input>
            <button
              onClick={async (e) => {
                e.preventDefault();
                const tagReturned = await createNewTag({ tag: newTag });
                // console.log("Tag Created", tagReturned)
                if(tagReturned.error){
                  enqueueSnackbar(tagReturned.error, {variant: "error"})
                }else{
                enqueueSnackbar("Tag Created!", { variant: "success" });
                props.setAllTags([...props.allTags, tagReturned]);
                setNewTag("");
                setClick(false);}
              }}
            >
              Add Tag!
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setClick(false);
              }}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div className="authorFormButtons">
          <button
            onClick={(e) => {
              e.preventDefault();
              setClick(true);
            }}
          >
            Create New Tag
          </button>
        </div>
      )}
      </div>

    </div>
  );
};

export default BookTagForm;
