import React, { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../context/UserContext"
import Upload from '../upload/Upload'

function Home() {
  const { userData } = useContext(UserContext)
  
  return (
    <div className="page">
      {userData.user ? (
        <>
          <h1>{userData.user.firstName}</h1>
          { userData.user.id !== "5fc7928aed8dad27600b082b"
           && (
             <Upload />
          )
          }
          {
            userData.user.id === "5fc7928aed8dad27600b082b" ? <Link to={`/5fc7928aed8dad27600b082b/pdfs`}> Show PDF </Link> :
              <Link to={`/${userData.user.id}/pdfs`}> Show PDF </Link>
          }
          
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  )
}

export default Home