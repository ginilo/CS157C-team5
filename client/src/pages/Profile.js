import React, { useState, useEffect } from "react";

export default function Profile() {

  const [data, setData] = useState(null);

 

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/login", { credentials: "include" })
        .then(async (response) => {
          const data = await response.json();
          if (data.loggedIn === true) {
            // loggedIn is true
           
            fetchProfile();
            // Further processing for logged in user
          } else {
            // loggedIn is false
            console.log("User not logged in");
            window.location.href = "/SignIn";
            // Further processing for non-logged in user
          }
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const fetchProfile = async () => {
    
    try {
      await fetch('http://localhost:5000/profile', { credentials: "include", method: "GET" })
      .then(async(response) =>{
        const jsonData = await response.json();
        setData(jsonData);
      })
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogOut = async (event) => {
    
    await fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "GET",
    
    })
      .then(async (response) => {
        if (response.ok) {
          window.location.href = "/SignIn";
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  return (
    <div className="profile">
      {data ? (
        <div className = "info-container">

          <div className = "image">
          <img src="https://i.ibb.co/KhJT5L8/profilepic.png" alt="profilepic" border="0"></img>
          {(data.account_type === 'student' || data.account_type === 'Student') && <p>Student</p>}
          
          <p>{data.fname + " " +  data.lname}</p>
          
          
    <button>Edit Profile</button>
    <p></p>
    <button onClick = {handleLogOut}>Log out</button>
    
          </div>

          <div className = "profileinfo">
            <h3>👤 Username: {data.username}</h3>
            <p>🔒 Account ID: {data.account_id}</p>
            <p>📞 Phone Number: {data.phone}</p>
            <p>📧 Email: {data.email}</p>
            <p>🌱 Last time visited: {data.last_visited}</p>
            <button><a href = "/PreviousOrders">See previous orders</a></button>
            
            </div>
          
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    
    </div>
  );
}
