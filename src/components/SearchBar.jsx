"use client";
export default function SearchBar({ value, onChange }) {
  return (
    <div className="max-w-xl mx-auto mb-8">
      <input
        type="text"
        placeholder="搜索功能名称、词条描述..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}