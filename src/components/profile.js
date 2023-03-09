import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../api/api";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserProfile().then((userResults) => {
      try {
        setUser(userResults);
        console.log(user);
      } catch (error) {
        console.log(error, " Problem with getting User");
      }
    });
  }, []);

  if (!user) {
    return <h2>You are not logged in!</h2>;
  }

  return (
    <div>
      <h2>
        Hello {user.firstName} {user.lastName}!
      </h2>
      <div>
        <div>Email: {user.email}</div>
        <div>Shipping Address: {user.shippingAddress} </div>
        <div>Phone: {user.phoneNumber} </div>
        {user.isAdmin && (
          <div>
            <h3>Admin Access</h3>
            <h4>What would you like to do today?</h4>
            <button>Add Book</button>
            <button>Update Book</button>
            <button>Delete Book</button>
            <button>View Users</button>
            <button>Make New Admin</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
