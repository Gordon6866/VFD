"use client";
import Image from "next/image";

export default function FuncCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
    >
      <div className="relative w-full h-40 bg-gray-200 rounded overflow-hidden mb-3">
        {item.videoCover ? (
          <Image src={item.videoCover} fill alt={item.funcName} className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            视频封面
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg">{item.funcName}</h3>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.definition}</p>
    </div>
  );
}