import type { ReactElement } from "react"

export default function Sidebaritems({ text, icon }: { text: string; icon: ReactElement }) {
  return (
    <div className="flex items-center p-4 gap-4 text-gray-700 font-medium text-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 rounded-xl hover:text-purple-700 hover:shadow-md cursor-pointer group">
      <div className="text-purple-500 group-hover:text-purple-600 transition-colors">{icon}</div>
      <span className="group-hover:font-semibold transition-all">{text}</span>
    </div>
  )
}
