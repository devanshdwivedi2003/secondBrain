"use client"

import { useRef, useState } from "react"
import Crossicon from "../icons/Crossicon"
import Button from "./Button"
import { BACKEND_URL } from "../Config"
import Inputbox from "./Inputbox"
import axios from "axios"

interface modalProps {
  open: boolean
  onclose: () => void
}

export type ContentType = "youtube" | "twitter"

export default function Contentmodal({ open, onclose }: modalProps) {
  const titleref = useRef<HTMLInputElement | null>(null)
  const linkref = useRef<HTMLInputElement | null>(null)
  const [type, setType] = useState("Youtube")
  const [loading, setLoading] = useState(false)

  async function addContent() {
    setLoading(true)
    try {
      const title = titleref.current?.value
      const link = linkref.current?.value
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      )
      onclose()
    } catch (error) {
      console.error("Error adding content:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onclose} />
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Add New Content
          </h2>
          <button onClick={onclose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Crossicon />
          </button>
        </div>

        <div className="space-y-4">
          <Inputbox reference={titleref} placeholder="Enter title" />
          <Inputbox reference={linkref} placeholder="Enter link" />
        </div>

        <div className="flex gap-2 py-6">
          <Button
            text="YouTube"
            variant={type === "Youtube" ? "primary" : "secondary"}
            onClick={() => setType("Youtube")}
          />
          <Button
            text="Twitter"
            variant={type === "Twitter" ? "primary" : "secondary"}
            onClick={() => setType("Twitter")}
          />
        </div>

        <div className="flex justify-center">
          <Button
            onClick={addContent}
            text={loading ? "Adding..." : "Submit"}
            variant="primary"
            fullWidth={true}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
