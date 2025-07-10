import Brainicon from "../icons/Brainicon"
import Xicon from "../icons/Xicon"
import Youtubeicon from "../icons/Youtubeicon"
import Sidebaritems from "./Sidebaritems"

export default function Sidebar() {
  return (
    <div className="h-screen w-96 bg-white/90 backdrop-blur-md border-r border-white/20 fixed top-0 left-0 shadow-xl">
      <div className="flex items-center pl-6 text-2xl pt-8 gap-3 font-bold">
        <div className="text-purple-600">
          <Brainicon />
        </div>
        <h1 className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Second Brain</h1>
      </div>

      <div className="pt-12 px-4">
        <div className="space-y-2">
          <Sidebaritems text="Twitter" icon={<Xicon />} />
          <Sidebaritems text="YouTube" icon={<Youtubeicon />} />
        </div>

        
      </div>
    </div>
  )
}
