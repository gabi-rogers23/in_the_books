import React from "react";
import { useState, useEffect } from "react";

const TagSelector = (props) => {
  const [tagSelected, setTagSelected] = useState(props.tag.isSelected);

  useEffect(() => {
    setTagSelected(props.tag.isSelected);
  }, [props.tag.isSelected]);

  return (
    <div className="tagSelectorMap" key={props.tag.id}>
      <label form={props.tag.name}>{props.tag.name}</label>
      <input
        type="checkbox"
        checked={tagSelected}
        name={props.tag.name}
        onChange={(e) => {
          const tag = e.target.checked;
          // console.log(tag);
          setTagSelected(tag);
          props.tag.isSelected = tag;
        }}
      ></input>
    </div>
  );
};

export default TagSelector;
