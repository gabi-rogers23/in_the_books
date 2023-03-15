import React from "react";
import { useState, useEffect } from "react";

const TagSelector = (props) => {
const [tagSelected, setTagSelected] = useState(props.tag.isSelected ? true : false)

useEffect(() => {
    // console.log(props.tag)
  }, []);

    return(<div key={props.tag.id}>{props.tag.name}<input type="checkbox" checked={tagSelected} 
    onChange={(e) => {
      const tag = e.target.checked;
      // console.log(tag);
      setTagSelected(tag)
      props.tag.isSelected=tag
    }}></input></div>)
}

export default TagSelector