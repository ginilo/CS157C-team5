import React, { useState, useEffect } from 'react';


export default function Profile(){

    useEffect(() => {

        (async () => {
            await fetch("http://localhost:5000/login", { credentials: 'include'})
              .then(async (response) => {
                const data = await response.json();
                if (data.loggedIn === true) {
                  // loggedIn is true
                  console.log(data.user); // User object or user data
                  // Further processing for logged in user
                } else {
                  // loggedIn is false
                  console.log('User not logged in');
                  // Further processing for non-logged in user
                }
              })
              .catch((error) => {
                console.error("There was an error:", error);
              });
          })();


    }, []);
    
    return <div className = "profile"><h1>Profile</h1></div>
}