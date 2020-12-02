import React, { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../context/UserContext"

export default function Home() {
  const { userData } = useContext(UserContext)

  return (
    <div className="page">
      {userData.user ? (<>
        <h1>Welcome {userData.user.firstName}</h1>
        <Link to="/upload">Upload</Link></>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  )
}
