import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

const PdfsList = () => {
  const [pdfs, setPdfs] = useState([])
  const {uid} = useParams()
  useEffect(() => {
    if (uid !== "5fc7928aed8dad27600b082b") {
      axios.get(`http://localhost:5000/users/${uid}/pdfs`).then((res) => {
        setPdfs([...res.data])
      })
    } else {
      axios.get(`http://localhost:5000/users/5fc7928aed8dad27600b082b/pdfs`).then((res) => {
        const data = [...res.data]
        const pdfList = data.map((user) => {
          return user.pdfs
        })
        const flatPdfList = pdfList.flat(pdfList.length) 
        setPdfs([...flatPdfList])
      })
    }
  }, [uid])
  return ( <>
    <ul>
    {
      pdfs.map((pdf) => (
        <li key={pdf._id}>
        <a href={`${pdf.fileLocation}${pdf.fileName}`} download>{pdf.fileName}</a>
        </li>
      ))
    }
      
    </ul>

    <Link to='/'> Home</Link>
    </>
  )
}

export default PdfsList
