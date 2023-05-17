import React from "react";
import { useState, useEffect } from "react";
import { fetchAllAuthors, createAuthor } from "../api/api";
import { useSnackbar } from "notistack";

const AuthorForm = (props) => {
  const [authorList, setAuthorList] = useState([]);
  const [newAuthor] = useState({});
  //dropdown state
  const [authorId, setAuthorId] = useState("");
  const [edit, setEdit] = useState(false);
  //form state
  const [authorFirstName, setAuthorFirstName] = useState("");
  const [authorLastName, setAuthorLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [authorImage, setAuthorImage] = useState("");
  const [authorBio, setAuthorBio] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  function refreshAuthors() {
    fetchAllAuthors().then((authors) => {
      setAuthorList(authors);
    });
  }

  useEffect(() => {
    refreshAuthors();
  }, []);

  useEffect(() => {
    if (props.book === null) {
      return;
    } else {
      setAuthorId(props.book.authorId);
    }
  }, [props.book]);

  return (
    <div>
      {!edit ? (
        <div className="authorContainer">
            <h3>Select Author:</h3>
          <fieldset className="authorDropDown">
            
            <select
              value={authorId}
              defaultValue={props.book ? props.book.authorId : "--"}
              onChange={(e) => {
                e.preventDefault();
                const newAuthorId = e.target.value;
                setAuthorId(
                  newAuthorId === "New Author" ? setEdit(true) : newAuthorId
                );
                props.bookToSend.current.authorId = newAuthorId;
                console.log(props.bookToSend.current.authorId);
              }}
            >
              <option value={"--"} label="--"></option>
              <option value={"New Author"} label="New Author"></option>
              {authorList.map((author) => {
                return (
                  <option
                    value={author.id}
                    key={author.id}
                    label={
                      author.authorLastName +
                      ", " +
                      author.authorFirstName +
                      " | Date of Birth: " +
                      author.dateOfBirth +
                      " | Birth Place: " +
                      author.birthPlace
                    }
                  ></option>
                );
              })}
            </select>
          </fieldset>
        </div>
      ) : (
        <form
          className="bookForm"
          onKeyDown={(e) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <h3>Add New Author:</h3>
          <div>
            <h4>Author First Name</h4>
            <input
              required
              value={authorFirstName}
              onChange={(e) => {
                e.preventDefault();
                const firstName = e.target.value;
                setAuthorFirstName(firstName);
                newAuthor.authorFirstName = firstName;
              }}
            ></input>
          </div>
          <div>
            <h4>Author Last Name</h4>
            <input
              required
              value={authorLastName}
              onChange={(e) => {
                e.preventDefault();
                const lastName = e.target.value;
                setAuthorLastName(lastName);
                newAuthor.authorLastName = lastName;
              }}
            ></input>
          </div>
          <div>
            <h4>Date Of Birth</h4>
            <input
              required
              value={dateOfBirth}
              onChange={(e) => {
                e.preventDefault();
                const DOB = e.target.value;
                setDateOfBirth(DOB);
                newAuthor.dateOfBirth = DOB;
              }}
            ></input>
          </div>
          <div>
            <h4>Birth Place</h4>
            <input
              required
              value={birthPlace}
              onChange={(e) => {
                e.preventDefault();
                const birthPlace = e.target.value;
                setBirthPlace(birthPlace);
                newAuthor.birthPlace = birthPlace;
              }}
            ></input>
          </div>
          <div>
            <h4>Link to Portrait</h4>
            <input
              value={authorImage}
              onChange={(e) => {
                e.preventDefault();
                const link = e.target.value;
                setAuthorImage(link);
                newAuthor.authorImage = link;
              }}
            ></input>
          </div>
          <div>
            <h4>Author Bio</h4>
            <input
              value={authorBio}
              onChange={(e) => {
                e.preventDefault();
                const bio = e.target.value;
                setAuthorBio(bio);
                newAuthor.authorBio = bio;
              }}
            ></input>
            <div className="authorFormButtons">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  // console.log(newAuthor);
                  const updatedAuthor = await createAuthor(newAuthor);
                  // console.log(updatedAuthor);
                  if (updatedAuthor.error) {
                    enqueueSnackbar(updatedAuthor.message, {
                      variant: "error",
                    });
                  } else {
                    setEdit(false);
                    setAuthorFirstName("");
                    setAuthorLastName("");
                    setDateOfBirth("");
                    setAuthorImage("");
                    setAuthorBio("");
                    refreshAuthors();
                  }
                }}
              >
                Add Author
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthorForm;
