"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-xl">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 
                   bg-white text-gray-800 placeholder-gray-400
                   focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                   focus:outline-none transition-all duration-200
                   shadow-sm hover:shadow-md text-sm"
        placeholder="搜索语音功能名称、描述或指令..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                     hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
