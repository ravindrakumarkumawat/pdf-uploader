import React, {useState} from 'react'
import {Progress} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css'
import './Upload.css'

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loaded, setLoaded] = useState(0)

  const checkMimeType  = (event) => {
    const files = event.target.files // Getting file Object
    const type = "application/pdf" // list of MIME type
    let err = []

    for (let x = 0; x < files.length; x++) {
      if (files[x].type !== type) {
        err[x] = `${files[x].type} is not a supported format \n`
      }
    }

    for (let z = 0; z < err.length; z++) {
      toast.error(err[z])
      event.target.value = null
    }
    
    return true
  }

  const maxSelectFile = (event) => {
    const files = event.target.files
    if(files.length > 3) {
      const msg = "Only 3 PDF can be uploaded at a time"
      event.target.value = null
      toast.warn(msg)
      return false
    }
    return true
  }

  const checkFileSize= (event) => {
    const files = event.target.files
    const size = 5 * 1024 * 1024

    let err = []
    
    for (let x = 0; x < files.length; x++) {
      if (files[x].size !== size) {
        err[x] = `${files[x].type} is not a supported format \n`
      }
    }
    
    for (let z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  }

  const onChangeHandler = (event) => {
    const files = event.target.files
    if (maxSelectFile && checkMimeType && checkFileSize) {
      setSelectedFile([...files])
    }
  }

  const onClickHandler = (e) => {
    const data = new FormData()
    for (let x = 0; x < selectedFile.length; x++) {
      data.append("file", selectedFile[x]);
    }

    axios
      .post("http://localhost:5000/upload", data, {
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
        },
      })
      .then((res) => {
        // then print response status
        toast.success("upload success");
        setLoaded(0)
      })
      .catch((err) => {
        // then print response status
        toast.error("Upload fail: Upload only 5 PDF files");
        setLoaded(0)
      });
  }
  return (
    <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
               <div className="form-group files">
                <label>Upload Your PDF File </label>
                <input type="file" accept="application/pdf" className="form-control" multiple onChange={onChangeHandler}/>
              </div>  
              <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={loaded} >{Math.round(loaded, 2)}%</Progress>
        
              </div> 
              
              <button type="button" className="btn btn-success btn-block" onClick={onClickHandler}>Upload</button>

	      </div>
      </div>
      </div>
  )
}

export default Upload
