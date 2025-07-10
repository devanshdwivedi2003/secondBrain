export default function Inputbox({ reference, placeholder }: { reference?: any; placeholder: string }) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        ref={reference}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
      />
    </div>
  )
}
