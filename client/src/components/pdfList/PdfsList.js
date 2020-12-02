import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const PdfsList = () => {
  const [pdfs, setPdfs] = useState([])
  const {uid} = useParams()
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${uid}/pdfs`).then((res) => {
      setPdfs([...res.data])
    })
  }, [])
  return ( <>
    <ul>
    {
      pdfs.map((pdf) => (
        <li key={pdf._id}>{pdf.fileName}</li>
      ))
    }
      
    </ul>

    <Link to='/'> Home</Link>
    </>
  )
}

export default PdfsList
