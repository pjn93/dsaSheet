import React,{useState, useEffect} from 'react'
import "./style.scss";


function Profile() {
  interface User {
    fullName: string;
    email: string;
  }

  const [user, setUser] = useState<User | null>(null); // Initially, the user state should be null or an empty object

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the JSON object saved in localStorage
    }
  }, []);

  if (!user) { // If no user data is found, display a loading or empty state
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {user.fullName}</h1> {/* Show the user's name */}
      <p><strong>Email:</strong> {user.email}</p> {/* Show the user's email */}
    </div>
  )
}

export default Profile
