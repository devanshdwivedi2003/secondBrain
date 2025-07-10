import Shareicon from "../icons/Shareicon"

interface Cardprops {
  title: string
  link: string
  type: "twitter" | "youtube"
}

export default function Card({ title, link, type }: Cardprops) {
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl rounded-2xl p-6 border border-white/20 max-w-80 min-h-64 transition-all duration-300 hover:scale-105 hover:bg-white">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-sm font-medium text-gray-800">
          <div className="text-purple-500 pr-3 flex-shrink-0">
            <Shareicon />
          </div>
          <span className="line-clamp-2">{title}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
          >
            <Shareicon />
          </a>
          <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4">
        {type === "youtube" && (
          <div className="relative rounded-xl overflow-hidden shadow-md">
            <iframe
              className="w-full h-48"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        {type === "twitter" && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")} className="text-blue-600 hover:text-blue-800 font-medium">
                View Tweet →
              </a>
            </blockquote>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${
            type === "youtube" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
          }`}
        >
          {type}
        </span>
      </div>
    </div>
  )
}
