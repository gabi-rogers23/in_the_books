import React from "react";
import { useState, useEffect } from "react";

const TagSelector = (props) => {
  const [tagSelected, setTagSelected] = useState(props.tag.isSelected);

  useEffect(() => {
    setTagSelected(props.tag.isSelected);
  }, [props.tag.isSelected]);

  return (
    <div className="tagSelectorMap" key={props.tag.id}>
      <input
        type="checkbox"
        checked={tagSelected}
        name={props.tag.name}
        onChange={(e) => {
          const tagCheck = e.target.checked;
          // console.log(tag);
          setTagSelected(tagCheck);
          props.tag.isSelected = tagCheck;
        }}
      ></input>
      <label form={props.tag.name}>{props.tag.name}</label>
    </div>
  );
};

export default TagSelector;
