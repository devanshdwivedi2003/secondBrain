
import type { ReactElement } from "react"

interface ButtonProps {
  text: string
  variant: "primary" | "secondary"
  startIcon?: ReactElement
  open?: () => void
  fullWidth?: boolean
  loading?: boolean
  onClick?: () => void
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl",
  secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200 hover:border-purple-300",
}

const defaultStyles =
  "px-4 py-2 rounded-lg cursor-pointer font-medium flex items-center justify-center transition-all duration-200 transform hover:scale-105 "

export default function Button({ text, variant, startIcon, open, fullWidth, loading, onClick }: ButtonProps) {
  const handleClick = onClick || open

  return (
    <button
      onClick={handleClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full" : ""} ${loading ? "opacity-50 cursor-wait transform-none" : ""}`}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text}
    </button>
  )
}
