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
    <div>
      <h3>Tags!</h3>
      <form>
        {tags.map((tag) => {
          return <TagSelector tag={tag} key={tag.id} />;
        })}
      </form>
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
                enqueueSnackbar("Tag Created!", { variant: "success" });
                setTags([...tags, tagReturned]);
                setNewTag("");
                setClick(false);
              }}
            >
              Add Tag!
            </button>
          </form>
        </div>
      ) : (
        <div className="authorFormButtons">
          {" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setClick(true);
            }}
          >
            New Tag
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default BookTagForm;
