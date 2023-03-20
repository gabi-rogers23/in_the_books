import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../api/api";
import { Search } from "./exports"
import "./app.css"


const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile().then((userResults) => {
      try {
        setUser(userResults);
        // console.log(user);
      } catch (error) {
        console.log(error, " Problem with getting User");
      }
    });
  }, []);

  if (!user) {
    return <h2>You are not logged in!</h2>;
  }

  return (
    <div className="profile">
      <h2 className="profileGreeting">Hello {user.firstName} {user.lastName}!</h2>
      <div className="profileDetails">
        <div className="profileDetail-item">
          <span className="profileDetail-label">Email:</span> {user.email}
        </div>
        <div className="profileDetail-item">
          <span className="profileDetail-label">Shipping Address:</span> {user.shippingAddress}
        </div>
        <div className="profileDetail-item">
          <span className="profileDetail-label">Phone:</span> {user.phoneNumber}
        </div>
        {user.isAdmin && (<>
           <div className="adminAccess">
           <h3>Admin Access</h3>
           <h4>What would you like to do today?</h4>
           <div className="adminButtons">
             <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/bookForm/new");
              }}
            >
              Add Book
            </button>
            <button className="viewUsersButton"
              onClick={(e) => {
                e.preventDefault();
                navigate("/me/viewUsers");
              }}>View Users</button>
          </div>
        </div>
            <div className="searchBooks">
              
              <Search />
            </div>
            </>)}
     </div>

   </div>
 );
};

export default Profile;
