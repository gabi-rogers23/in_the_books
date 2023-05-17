import React from "react";
import { useState, useEffect } from "react";
import { fetchAllTags, createNewTag } from "../api/api";
import { TagSelector } from "./exports";
import { useSnackbar } from "notistack";

const BookTagForm = (props) => {
  const [tags, setTags] = useState([]);
  const [click, setClick] = useState(false);
  const [newTag, setNewTag] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const selectedBookTags = props.book.tags.map((tag) => tag.tagId);
  tags.forEach((tag) => {
    tag.isSelected = selectedBookTags.includes(tag.id);
  });
  // console.log("CurrentTags", tags);

  props.bookToSend.current.tags = tags;

  useEffect(() => {
    fetchAllTags().then(setTags).catch(console.log);
  }, []);

  // console.log(props.book);
  return (
    <div className="tagContainer">
      <h3>Add/Remove Tags:</h3>
      <form className="tagForm">
        {tags.map((tag) => {
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
                console.log("Tag Created", tagReturned)
                if(tagReturned.error){
                  enqueueSnackbar(tagReturned.error, {variant: "error"})
                }else{
                enqueueSnackbar("Tag Created!", { variant: "success" });
                setTags([...tags, tagReturned]);
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
      </form>

    </div>
  );
};

export default BookTagForm;
