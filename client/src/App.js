import React from 'react'
import {Progress} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (<>
    <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
               <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" multiple />
              </div>  
              <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success"  >80%</Progress>
        
              </div> 
              
              <button type="button" className="btn btn-success btn-block" >Upload</button>

	      </div>
      </div>
      </div>
    <form
      method="POST"
      action="http://localhost:5000/upload-profile-pic"
      encType="multipart/form-data"
    >
      <div>
        <label>Select your profile picture:</label>
        <input type="file" name="profile_pic" />
      </div>
      <div>
        <input type="submit" name="btn_upload_profile_pic" value="Upload" />
      </div>
    </form>
    </>
  )
}

export default App;
