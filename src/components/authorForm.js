import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../api/api";

const AuthorForm = (props) => {
  const [authorFirstName, setAuthorFirstName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [authorBio, setAuthorBio] = useState("");

  return (
    <div>
      <form>
        <h3>Author Information</h3>
        <div>
          Author First Name
          <input value={authorFirstName} onChange={(e) => {
            e.preventDefault()
            const firstName = e.target.value;
            setAuthorFirstName(firstName)
            props.bookToSend.author.firstName = firstName;
          }}></input>
        </div>
        <div>
          Author Last Name<input value={authorLastName} onChange={(e) => {
            e.preventDefault()
            const lastName = e.target.value;
            setAuthorLastName(lastName)
            props.bookToSend.author.lastName = lastName;
          }}></input>
        </div>
        <div>
          Date Of Birth<input value={dateOfBirth} onChange={((e)=>{
            e.preventDefault()
            const DOB = e.target.value
            setDateOfBirth(DOB)
            props.bookToSend.author.dateOfBirth = DOB
          })}></input>
        </div>
        <div>
          Birth Place<input value={birthPlace} onChange={(e) => {
            e.preventDefault()
            const birthPlace = e.target.value;
            setBirthPlace(birthPlace)
            props.bookToSend.author.birthPlace = birthPlace;
          }}></input>
        </div>
        <div>
          Link to Portrait<input value={authorImage} onChange={(e) => {
            e.preventDefault()
            const link = e.target.value;
            setAuthorImage(link)
            props.bookToSend.author.authorImage = link;
          }}></input>
        </div>
        <div>
          Bio<input value={authorBio} onChange={(e) => {
            e.preventDefault()
            const bio = e.target.value;
            setAuthorBio(bio)
            props.bookToSend.author.bio = bio;
          }}></input>
        </div>
      </form>
    </div>
  );
};

export default AuthorForm;
