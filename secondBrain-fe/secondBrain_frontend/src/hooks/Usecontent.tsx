"use client"

import { useEffect, useState } from "react"
import { BACKEND_URL } from "../Config"
import axios from "axios"

export default function Usecontent() {
  const [content, setcontent] = useState([])

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setcontent(response.data.content))
      
  }, [])

  return content
}
