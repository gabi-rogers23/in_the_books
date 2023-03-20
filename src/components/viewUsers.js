import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, fetchUserCart } from "../api/api";

const ViewUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAllUsers()]).then(([allUsersResults]) => {
      try {
        // console.log(allUsersResults);
        setAllUsers(allUsersResults);
      } catch (error) {
        console.error("Uh oh! Problems with Promises");
      }
    });
  }, []);

  return (
    <div className="viewUsersContainer">
      <form>
        <h3>Search Users</h3>
        <input
          type="search"
          placeholder="Search by Email or Phone Number"
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);

            if (e.target.value.length === 0) {
              setUsersToDisplay(allUsers);
            } else {
              const lowercasedSearchTerm = searchTerm.toLowerCase();

              const filteredUsers = allUsers.filter((user) => {
                return (
                  user.email.toLowerCase().includes(lowercasedSearchTerm) ||
                  user.phoneNumber.toLowerCase().includes(lowercasedSearchTerm)
                );
              });
              setUsersToDisplay(filteredUsers);
            }
          }}
        ></input>
      </form>

      {usersToDisplay && (
        <div>
          {usersToDisplay.map((user) => {
            return (
              <div key={user.id} className="usersMap">
                <div>
                  <div>
                    <b>Email: </b>
                    {user.email}
                  </div>
                  <div><b>Phone:  </b> {user.phoneNumber}</div>
                </div>
                <button
                  className="userButton"
                  onClick={async (e) => {
                    e.preventDefault();
                    navigate(`/me/viewUsers/${user.id}`);
                  }}
                >
                  User Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
